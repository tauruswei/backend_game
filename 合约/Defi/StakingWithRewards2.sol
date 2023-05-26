// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    // 存储每个地址的质押信息
    struct Stake {
        uint256 amount;
        uint256 startTimestamp;
        uint256 rewardRate;  // 奖励率
        uint256 lastUpdateTime;
        uint256 earned;
        uint256 lockTimestamp; // 锁定期限
        uint256 penaltyRate; // 惩罚比率，精确到百分比
    }
    // 存储所有的代币信息和用户信息
    mapping(address => mapping(address => Stake)) public stakes;

    // 存储所有用户质押数量的总和
    mapping(address => uint256) public totalStaked;

    // 存储单笔质押的币种奖励总收益
    mapping(IERC20 => uint256) public rewardPerToken;

    IERC20 public immutable token;
    uint256 public immutable rewardAmount;

    uint256 public constant STAKING_PERIOD = 90 days;

    event Staked(address indexed user, address indexed token, uint256 amount, uint256 reward);
    event Withdrawn(address indexed user, address indexed token, uint256 amount, uint256 reward);

    constructor(IERC20 _token) {
        token = _token;
        rewardAmount = 0.01 * 10 ** _token.decimals(); // 每个代币的总奖励（在第一天）
    }

    // 质押
    function stake(uint256 amount, address tokenAddress) external {
        require(amount > 0, "Amount should be greater than zero");

        Stake storage userStake = stakes[msg.sender][tokenAddress];
        if (userStake.amount == 0) {
            userStake.rewardRate = rewardAmount;
            userStake.startTimestamp = block.timestamp;
            userStake.lockTimestamp = userStake.startTimestamp + STAKING_PERIOD;
        } else {
            // 如果锁定期还未过期，则不允许继续质押
            require(userStake.lockTimestamp <= block.timestamp, "Cannot stake before lock expires");
            calculateReward(userStake);
            userStake.rewardRate = rewardPerToken[token];
            userStake.startTimestamp = block.timestamp;
            userStake.lockTimestamp = userStake.startTimestamp + STAKING_PERIOD;
        }
        userStake.lastUpdateTime = block.timestamp;
        userStake.amount += amount;

        // 更新收益和总质押金额
        updateReward(tokenAddress);
        totalStaked[tokenAddress] += amount;

        token.transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, tokenAddress, amount, userStake.earned);
    }

    // 计算并领取奖励
    function withdraw(address tokenAddress) external {
        Stake storage userStake = stakes[msg.sender][tokenAddress];
        require(userStake.amount > 0, "No staked amount to withdraw");
        require(block.timestamp >= userStake.startTimestamp + STAKING_PERIOD, "Cannot withdraw before staking period is over");

        calculateReward(userStake);
        uint256 amount = userStake.amount;
        uint256 reward = userStake.earned;

        // 重置质押记录
        delete stakes[msg.sender][tokenAddress];
        totalStaked[tokenAddress] -= amount;
        token.transfer(msg.sender, amount);
        token.transfer(msg.sender, reward);

        emit Withdrawn(msg.sender, tokenAddress, amount, reward);
    }

    // 计算质押的奖励
    function calculateReward(Stake storage stake) internal {
        // 如果未开始计算奖励，则不需要计算任何收益
        if (stake.lastUpdateTime == 0) {
            return;
        }

        uint256 timeElapsed = block.timestamp - stake.lastUpdateTime;
        if (timeElapsed > 0 && stake.amount > 0) {
            uint256 rewardEarned = stake.amount * timeElapsed * stake.rewardRate / STAKING_PERIOD / 1e12;
            stake.earned += rewardEarned;
                }
    stake.lastUpdateTime = block.timestamp;
}

    // 获取用户质押信息
    function getStakeInfo(address user, address tokenAddress) public view returns (Stake memory) {
        return stakes[user][tokenAddress];
    }

    // 获取所有质押的代币总额
    function getTotalStaked(address tokenAddress) public view returns (uint256) {
        return totalStaked[tokenAddress];
    }

    // 更新奖励金额
    function updateReward(address tokenAddress) internal {
        uint256 totalAmount = getTotalStaked(tokenAddress);
        rewardPerToken[IERC20(tokenAddress)] = rewardAmount * (STAKING_PERIOD - 10 days) / STAKING_PERIOD / totalAmount / 1e12;
    }

    // 获取合约中代币奖励总收益
    function getReward(address tokenAddress) public view returns (uint256) {
        return rewardAmount * (STAKING_PERIOD - 10 days) / STAKING_PERIOD;
    }

    // 查看质押的代币奖励率
    function getRewardRate(address user, address tokenAddress) public view returns (uint256) {
        Stake memory stake = stakes[user][tokenAddress];
        if (stake.amount == 0 || block.timestamp < stake.startTimestamp + STAKING_PERIOD) {
            return 0;
        }
        return stake.earned * 1e12 / stake.amount / (STAKING_PERIOD - 10 days);
    }

}