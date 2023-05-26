// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SLStakingPool is Ownable, ReentrancyGuard {
  using SafeMath for uint256;

  IERC20 public token;

  uint256 public totalStakeAmount;
  uint256 public lockupPeriod; //锁定期，初步设为 90 天

  mapping(address => uint256) public stakingTime; // 各个用户质押的时间

  uint256 public minStakeAmount; // 最小质押数量，初步设为400 COSD
  mapping(address => uint256) public balances;

  event Stake(address indexed user, uint256 amount);
  event UnStake(address indexed user, uint256 amount);

  constructor(address _tokenAddress, uint256 _minStakeAmount, uint256 _lockupPeriod) {
    token = IERC20(_tokenAddress);
    minStakeAmount = _minStakeAmount;
    lockupPeriod = _lockupPeriod;
  }

  function stake(uint256 _amount) external nonReentrant {
    require(balances[msg.sender].add(_amount) >= minStakeAmount, "Amount should be greater than or equal to minStakeAmount");
    require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");

    balances[msg.sender] = balances[msg.sender].add(_amount);

    // if(stakingTime[msg.sender] == 0){
    //   stakingTime[msg.sender] = block.timestamp;
    // }

    emit Stake(msg.sender, _amount);
  }

  function unStake(uint256 _amount) external nonReentrant {
    // require(block.timestamp >= (stakingTime[msg.sender].add(lockupPeriod)), "Locked");
    require(balances[msg.sender] >= _amount, "Insufficient balance");
    require(token.transfer(msg.sender, _amount), "Token transfer failed");

    balances[msg.sender] = balances[msg.sender].sub(_amount);

    emit UnStake(msg.sender, _amount);
  }

  // 修改最小的质押数量
  function setMinStakeAmount(uint256 _amount) external onlyOwner {
    require(_amount >= 0, "Amount should be greater than zero");
    minStakeAmount = _amount;
  }
  //获取合约中所有用户的总质押量
  function totalStaked() external view returns (uint256) {
      return token.balanceOf(address(this));
  }
  // 查询用户的余额
  function balanceOf(address _address) external view returns (uint256){
      return balances[_address];
  }
}