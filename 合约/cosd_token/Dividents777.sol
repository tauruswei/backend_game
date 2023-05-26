// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC777/ERC777.sol';
import "./ERC777.sol";

contract Dividents777 is ERC777 {
  constructor() ERC777('Chess Of Stars Dividents', 'COSD', new address[](0)) {
    _mint(msg.sender, 1_000_000_000 * (10**18), '', '');
  }
}