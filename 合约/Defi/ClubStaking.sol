// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract ClubStakingPool is Ownable, ReentrancyGuard {
  using SafeMath for uint256;
  IERC20 public token;

  uint256 public maxAmount;                         // 本期池子可质押的最大数量

  uint256 public lockupPeriod;                      //锁定期，初步设为 90 天

  uint256 public stakingStartTime;                  // 项目 staking 开始时间

  uint256 public totalStakeAmount;                  // 总的质押数量

  mapping(address => bool) public isClub;           // 标志用户是否是俱乐部老板

  uint256 public minStakeAmount;                    // 最小质押数量，初步设为4000 COSD，后面可能会进行修改

  mapping(address => uint256) public balances;      // 用户的质押数量

  mapping(address => uint256) public stakingTime;   // 各个用户质押的时间，只有在解锁期后，用户才可以提现

  event Stake(address indexed user, uint256 amount, bool isClub);
  event UnStake(address indexed user, uint256 amount, bool isClub);

  constructor(address _tokenAddress, uint256 _minStakeAmount,uint256 _lockupPeriod,uint256 _maxAmount) {
    token = IERC20(_tokenAddress);
    minStakeAmount = _minStakeAmount;
    lockupPeriod = _lockupPeriod;
    maxAmount = _maxAmount;
    stakingStartTime = block.timestamp;
  }

  function stake(uint256 _amount) external nonReentrant {
    require(block.timestamp<stakingStartTime+lockupPeriod,"The current staking activity has ended");
    require(totalStakeAmount.add(maxAmount) >= totalStakeAmount.add(_amount),"Amount exceeds the maximum amount of pool pledges allowed for the period");
    require(balances[msg.sender].add(_amount) >= minStakeAmount, "Amount should be greater than or equal to minStakeAmount");
    require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
    balances[msg.sender] = balances[msg.sender].add(_amount);
    totalStakeAmount = totalStakeAmount.add(_amount);
    // if(stakingTime[msg.sender] == 0){
    stakingTime[msg.sender] = block.timestamp;
    // }
    isClub[msg.sender]=true;
    emit Stake(msg.sender, _amount,isClub[msg.sender]);
  }

  function unStake(uint256 _amount) external nonReentrant {
    require(block.timestamp >= (stakingTime[msg.sender].add(lockupPeriod)), "Locked");
    require(balances[msg.sender] >= _amount, "Insufficient balance");
    require(token.transfer(msg.sender, _amount), "Token transfer failed");
    balances[msg.sender] = balances[msg.sender].sub(_amount);
    totalStakeAmount = totalStakeAmount.sub(_amount);
    if(balances[msg.sender] < minStakeAmount){
      isClub[msg.sender] = false;
    }
    emit UnStake(msg.sender, _amount,isClub[msg.sender]);
  }

  // 修改最小的质押数量
  function setMinStakeAmount(uint256 _amount) external onlyOwner {
    require(_amount > 0, "Amount should be greater than 0");
    minStakeAmount = _amount;
  }
  // 激活池子或者关闭池子
  function setStakingStartTime(uint256 _stakingStartTime) external onlyOwner {
    stakingStartTime = _stakingStartTime;
  }
  // 设置池子的本期质押总数量
  function setMaxAmount(uint256 _maxAmount) external onlyOwner {
    require(_maxAmount > 0, "Max amount should be greater than 0");
    maxAmount=_maxAmount;
  }
  // 设置锁仓时间
  function setLockupPeriod(uint256 _lockupPeriod) external onlyOwner {
    require(_lockupPeriod > 0, "LockupPeriod should be greater than 0");
    lockupPeriod=_lockupPeriod;
  }
    // 查询用户的余额
  function balanceOf(address _address) external view returns (uint256){
      return balances[_address];
  }
}