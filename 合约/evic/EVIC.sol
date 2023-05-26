// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EvicToken is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    IERC20 public usdt; // USDT 合约实例

    string public name = "Chess of Stars EVIC Token";
    string public symbol = "EVIC";
    uint256 public decimals = 18;
    uint256 public totalSupply;
    uint256 public evicPrice; // 1 USDT = 100 EVIC

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event BuyEvic(address indexed buyer, uint256 amount, uint256 tokensBought);
    event WithDrawEvic(address indexed owner, uint256 amount, uint256 usdtReceived);


    constructor(address _usdtAddress, uint256 _evicPrice) {
        usdt = IERC20(_usdtAddress);
        evicPrice = _evicPrice;
    }

    // function buyEvic(uint256 usdtAmount) external nonReentrant{
    //     uint256 amount = usdtAmount.mul(evicPrice); // 处理溢出
    //     require(usdt.allowance(msg.sender, address(this)) >= usdtAmount, "Insufficient allowance");
    //     require(usdt.transferFrom(msg.sender, address(this), usdtAmount), "USDT transfer failed");
    //     balances[msg.sender] = balances[msg.sender].add(amount); // 处理溢出
    //     totalSupply = totalSupply.add(amount); // 处理溢出
    //     emit Transfer(address(0), msg.sender, amount);
    //     emit BuyEvic(msg.sender, usdtAmount, amount);
    // }

    function buyEvic(uint256 amount) external nonReentrant{
        uint256 usdtAmount = amount.div(evicPrice); // 处理溢出
        require(usdt.allowance(msg.sender, address(this)) >= usdtAmount, "Insufficient allowance");
        require(usdt.transferFrom(msg.sender, address(this), usdtAmount), "USDT transfer failed");
        balances[msg.sender] = balances[msg.sender].add(amount); // 处理溢出
        totalSupply = totalSupply.add(amount); // 处理溢出
        emit Transfer(address(0), msg.sender, amount);
        emit BuyEvic(msg.sender, usdtAmount, amount);
    }

    function withDrawEvic(uint256 amount) external nonReentrant{
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] = balances[msg.sender].sub(amount);
        totalSupply = totalSupply.sub(amount);
        uint256 usdtAmount = amount.div(evicPrice); // 处理溢出
        require(usdt.transfer(msg.sender, usdtAmount), "USDT transfer failed");
        emit Transfer(msg.sender, address(0), amount);
        emit WithDrawEvic(msg.sender, amount, usdtAmount);
    }

      // 合约所有者可从合约中提取 USDT
    function withdrawUSDT(uint256 amount) external onlyOwner{
        require(usdt.balanceOf(address(this))>=amount,"Amount is greater than the balance of contract");
        usdt.safeTransfer(owner(), usdt.balanceOf(address(this)));
    }

    function approve(address spender, uint256 amount) external virtual nonReentrant returns (bool) {
        require(balances[msg.sender]>=amount,"Amout is greater than the balance of sender");
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transfer(address recipient, uint256 amount) external virtual nonReentrant returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external virtual nonReentrant returns (bool) {
        require(allowances[sender][msg.sender] >= amount, "Insufficient allowance");
        allowances[sender][msg.sender] = allowances[sender][msg.sender].sub(amount);
        _transfer(sender, recipient, amount);
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "Transfer from zero address");
        require(recipient != address(0), "Transfer to zero address");
        uint256 senderBalance = balances[sender];
        require(senderBalance >= amount, "Insufficient balance");
        balances[sender] = senderBalance.sub(amount); 
        balances[recipient] = balances[recipient].add(amount); 
        emit Transfer(sender, recipient, amount); 
    }
    function balanceOf(address account) external view virtual returns (uint256) {
        return balances[account];
    }

    function allowance(address owner, address spender) external view virtual returns (uint256) {
        return allowances[owner][spender];
    }
    function setEvicPrice(uint256 _evicPrice) external  onlyOwner {
        evicPrice = _evicPrice;
    }

}