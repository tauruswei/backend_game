// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 引入 OpenZeppelin 的 IERC20 接口和 SafeMath 库
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// ERC20 代币质押池合约
contract TokenStakingPool {
    // 引入 OpenZeppelin 的 SafeMath 库
    using SafeMath for uint256;

    // ERC20 代币合约实例
    IERC20 public token;
    // 质押池总量
    uint256 public totalStaked;
    // 每天的利率百分比
    mapping(uint256 => uint256) public dailyInterestRates;
    // 用户质押数量
    mapping(address => uint256) public stakedBalances;
    // 用户上次质押的时间
    mapping(address => uint256) public lastStakedTime;
    // 用户累积的利息
    mapping(address => uint256) public accuredInterests;

    constructor(address _token) {
        token = IERC20(_token);
    }

    // 用户将代币质押到质押池
    function stake(uint256 _amount) external {
        require(_amount > 0, "Cannot deposit zero tokens");

        // 更新用户的累积利息
        if (stakedBalances[msg.sender] > 0) {
            uint256 accuredInterest = getAccuredInterest(msg.sender);
            accuredInterests[msg.sender] = accuredInterests[msg.sender].add(accuredInterest);
        }
        stakedBalances[msg.sender] = stakedBalances[msg.sender].add(_amount);
        lastStakedTime[msg.sender] = block.timestamp;
        totalStaked = totalStaked.add(_amount);
        token.transferFrom(msg.sender, address(this), _amount);
    }

    // 用户从质押池中撤回质押代币
    function unstake(uint256 _amount) external {
        require(_amount > 0, "Cannot withdraw zero tokens");

        // 更新用户的累积利息
        uint256 accuredInterest = getAccuredInterest(msg.sender);
        accuredInterests[msg.sender] = accuredInterests[msg.sender].add(accuredInterest);
        stakedBalances[msg.sender] = stakedBalances[msg.sender].sub(_amount);
        lastStakedTime[msg.sender] = block.timestamp;
        totalStaked = totalStaked.sub(_amount);
        token.transfer(msg.sender, _amount);
    }

    // 计算用户未提取的利息
    function getAccuredInterest(address _user) public view returns (uint256) {
        uint256 timeDiff = block.timestamp.sub(lastStakedTime[_user]);
        uint256 interestRate = dailyInterestRates[block.timestamp.div(1 days)];
        uint256 accuredInterest = stakedBalances[_user].mul(timeDiff).mul(interestRate).div(100);
        return accuredInterest;
    }

    // 设置特定日期的每日收益率，为百分之几
    function setInterestRate(uint256 _date, uint256 _interestRate) external {
        require(_interestRate >= 0 && _interestRate <= 100, "Invalid interest rate value");
        dailyInterestRates[_date] = _interestRate;
    }

    // 返回用户的总余额（质押数量 + 累积的利息）
    function balanceOf(address _user) external view returns (uint256) {
        uint256 accuredInterest = getAccuredInterest(_user);
        return stakedBalances[_user].add(accuredInterests[_user]).add(accuredInterest);
    }
}

