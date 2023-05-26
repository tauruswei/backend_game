// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0/contracts/token/ERC20/utils/SafeERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.0//contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


// 代币兑换合约
contract TokenExchange is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public usdt; // USDT 合约实例
    IERC20 public myToken; // 自定义代币合约实例
    uint256 public exchangeRate; // 兑换比例
    // address public owner; // 合约所有者
    uint256 public maxAmout; // 设置每个用户的最大购买量
    mapping(address => uint256) public cumulativePurchase;  // 记录用户的购买量


    event BuyToken(address indexed user, uint256 usdtAmount,uint256 tokenAmount);


    constructor(
        address _usdtAddress,
        address _tokenAddress,
        uint256 _exchangeRate,
        uint256 _maxAmout
    ) {
        usdt = IERC20(_usdtAddress);
        myToken = IERC20(_tokenAddress);
        exchangeRate = _exchangeRate;
        maxAmout = _maxAmout;
        // owner = msg.sender;
    }

    // function buyToken(uint256 _usdtAmount) external {
    //     // uint256 _usdtAmount = tokenAmount.div(exchangeRate);
    //     uint256 tokenAmount = _usdtAmount * exchangeRate;
    //     require(maxAmout >= myToken.balanceOf(msg.sender).add(tokenAmount),"A single user cannot buy too many tokens");
    //     require(myToken.balanceOf(address(this))>=tokenAmount,"The number of tokens that users need to purchase exceeds the number of tokens currently available for purchase");
    //     require(usdt.balanceOf(msg.sender) >= _usdtAmount, "Not enough USDT");
    //     require(usdt.transferFrom(msg.sender, address(this), _usdtAmount),"Transfer to address(this) failed");
    //     require(myToken.transfer(msg.sender, tokenAmount),"Transfer to msg.sender failed");
    //     emit BuyToken(msg.sender, _usdtAmount,tokenAmount);
    // }    
    function buyToken(uint256 tokenAmount) external nonReentrant {
        uint256 _usdtAmount = tokenAmount.div(exchangeRate);
        // uint256 tokenAmount = _usdtAmount * exchangeRate;
        require(maxAmout >= cumulativePurchase[msg.sender].add(tokenAmount),"A single user cannot buy too many tokens");
        require(myToken.balanceOf(address(this))>=tokenAmount,"The number of tokens that users want to purchase exceeds the number of tokens currently available for purchase");
        require(usdt.balanceOf(msg.sender) >= _usdtAmount, "Not enough USDT");
        require(usdt.transferFrom(msg.sender, address(this), _usdtAmount),"Transfer to contract failed");
        require(myToken.transfer(msg.sender, tokenAmount),"Transfer to msg.sender failed");
        cumulativePurchase[msg.sender] = cumulativePurchase[msg.sender].add(tokenAmount);
        emit BuyToken(msg.sender, _usdtAmount,tokenAmount);
    }

    // // 合约所有者可从合约中提取奖励
    // function withdrawToken() external {
    //     require(msg.sender == owner, "Not authorized");
    //     require(myToken.transfer(msg.sender, myToken.balanceOf(address(this))),"Withdraw token to msg.sender failed");
    // }

    // 合约所有者可从合约中提取 USDT
    function withdrawUSDT(uint256 amount) external onlyOwner{
        require(usdt.balanceOf(address(this))>=amount,"Amount is greater than the balance of contract");
        usdt.safeTransfer(owner(), usdt.balanceOf(address(this)));
    }

    // 更改兑换比例
    function setExchangeRate(uint256 _exchangeRate) external onlyOwner{
        exchangeRate = _exchangeRate;
    }
     // 更改每个用户的最大购买量
    function setMaxAmout(uint256 _maxAmount) external onlyOwner{
        maxAmout = _maxAmount;
    }
}