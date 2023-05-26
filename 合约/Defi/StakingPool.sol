// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract StakingPool is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public token;               // 导入的 ERC20 代币
    IERC20 public rewardToken;         // 奖励代币，本例中是 USDT
    uint256 public rewardRateInit;     // 每个代币每天的分润
    uint256 public lockupPeriod;       // 锁定期，初步设为 90 天
    uint256 public stakingStartTime;   // 项目 staking 开始时间

    mapping(address => uint256) public stakingBalance;  // 各个用户质押的代币数量
    mapping(address => uint256) public stakingTime;     // 各个用户质押的时间
    mapping(address => uint256) public stakingReward;   // 各个用户已经获得的奖励金额

    uint256 public totalStake;  // 池子中的总质押量
    uint256 public totalReward; // 池子中的总奖励

    uint256 public dayTime = 86400; // 每天一共有 86400 秒

    event Stake(address indexed user, uint256 amount);
    event UnStake(address indexed user, uint256 amount);
    event ClaimReward(address indexed user, uint256 amount);

    constructor(address _token, address _rewardToken, uint256 _rewardRateInit, uint256 _lockupPeriod) {
        token = IERC20(_token);
        rewardToken = IERC20(_rewardToken);
        rewardRateInit = _rewardRateInit;
        lockupPeriod = _lockupPeriod;
        stakingStartTime = block.timestamp;
    }

    // 质押代币
    function stake(uint256 _amount) external nonReentrant {
        require(block.timestamp < stakingStartTime + lockupPeriod, "The current staking activity has ended");
        require(_amount > 0, "Amount should greater than zero");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        stakingTime[msg.sender] = block.timestamp;
        uint256 reward = getRewardForUser(msg.sender,_amount);
        stakingReward[msg.sender] = stakingReward[msg.sender].add(reward);
        totalStake = totalStake.add(_amount);
        totalReward = totalReward.add(reward);
        emit Stake(msg.sender, _amount);
    }

    // 撤回代币，仅在锁定期后允许
    function unStake(uint256 _amount) external nonReentrant {
        require(block.timestamp >= (stakingStartTime + lockupPeriod), "Locked");
        require(stakingBalance[msg.sender] >= _amount, "Insufficient balance");
        require(token.transfer(msg.sender, _amount), "Transfer failed");
        stakingBalance[msg.sender] = stakingBalance[msg.sender].sub(_amount);
        totalStake = totalStake.sub(_amount);
        emit UnStake(msg.sender, _amount);
    }

    // 提取奖励
    function claimReward() external nonReentrant {
        require(block.timestamp >= (stakingStartTime + lockupPeriod), "Locked");
        uint256 reward = stakingReward[msg.sender];
        require(rewardToken.transfer(msg.sender, reward), "Transfer failed");
        stakingReward[msg.sender]=0;
        totalReward = totalReward.sub(reward);
        emit ClaimReward(msg.sender, reward);
    }

    // 获取用户的累计奖励，不会实际转账
    function getRewardForUser(address account,uint256 _amount) internal view returns (uint256) {
        uint256 stakingDaysRemaining = (lockupPeriod.add(stakingStartTime)).sub(stakingTime[account]); // 计算用户已经质押的天数，不足一天按1天计算
        // uint256 rewardRate = (stakingDaysRemaining.div(60)).add(1).mul(rewardRateInit).div(1e18);
        uint256 reward = _amount.div(1e6).mul(rewardRateInit).mul(stakingDaysRemaining).div(dayTime);
        return reward;
    }

    // 设置奖励代币实例
    function setRewardToken(address _rewardToken) external onlyOwner {
        rewardToken = IERC20(_rewardToken);
    }

    // 设置项目质押开始时间
    function setStakingStartTime(uint256 _stakingStartTime) external onlyOwner {
        stakingStartTime = _stakingStartTime;
    }

      // 设置项目质押开始时间
    function setLockupPeriod(uint256 _lockupPeriod) external onlyOwner {
        lockupPeriod = _lockupPeriod;
    }
    // 设置每枚代币的分润
    function setRewardRateInit(uint256 _rewardRateInit) external onlyOwner {
        rewardRateInit = _rewardRateInit;
    }
      // 查询用户的余额
    function balanceOf(address _address) external view returns (uint256){
        return stakingBalance[_address];
    }
}