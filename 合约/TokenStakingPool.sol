pragma solidity ^0.8.0;

import "./cosd_token//IERC20.sol";

contract TokenStakingPool {
  // boolean to prevent reentrancy
  bool internal locked;

  IERC20 public token;                     
  uint256 public minStakeAmount;           
  mapping(address => uint256) public balances;  

  // Contract owner
    address public owner;
 
  event Deposit(address indexed user, uint256 amount);
  event Withdraw(address indexed user, uint256 amount);

  constructor(address _tokenAddress, uint256 _minStakeAmount) {
    token = IERC20(_tokenAddress);
    minStakeAmount = _minStakeAmount;
    owner = msg.sender;
  }


  // Modifier
  /**
    * @dev Prevents reentrancy
    */
  modifier noReentrant() {
      require(!locked, "No re-entrancy");
      locked = true;
      _;
      locked = false;
  }

  // Modifier
  /**
    * @dev Throws if called by any account other than the owner.
    */
  modifier onlyOwner() {
      require(msg.sender == owner, "Message sender must be the contract's owner.");
      _;
  }

  function stakeTokens(uint256 _amount) external  noReentrant {
    // require(_amount >= minStakeAmount, "Amount should be greater than or equal to minStakeAmount");
    // require(token.transferFrom(msg.sender, address(this), _amount), "Token transfer failed");
    token.approve(address(this), _amount);
    balances[msg.sender] += _amount;
    emit Deposit(msg.sender, _amount);
  }

  function withdrawTokens(uint256 _amount) external noReentrant{
    require(balances[msg.sender] >= _amount, "Insufficient balance");
    require(token.transfer(msg.sender, _amount), "Token transfer failed");
    balances[msg.sender] -= _amount;
    emit Withdraw(msg.sender, _amount);
  }
}
