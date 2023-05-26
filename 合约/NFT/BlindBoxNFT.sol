// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface AnotherContract {
    function mintAndTransfer(address  param1, string memory param2 ,string memory param3) external returns (uint256);
}

contract BlindBox {
    using SafeMath for uint256;
    string[] private group1 = ["10001","10002","10003","10004","10005","10006","10007","10008","10009","20001"];
    string[] private group2 = ["20002","20003","20004","20005","20006"];
    string[] private group3 = ["30001","30002","30003","30004"];
    string[] private group4 = ["40001","40002","40003"];

     AnotherContract private anotherContract;

    constructor(address anotherContractAddress) {
        anotherContract = AnotherContract(anotherContractAddress);
    }
    
    event DrawCardEvent(address indexed from, uint256 cardId);


    function drawCard() public {
        uint256 r = random() % 1000;
        uint256 cardId;

        if (r < 800) {
            cardId = anotherContract.mintAndTransfer(msg.sender, group1[random()%(group1.length)],"50");
        } else if (r < 960) {
            cardId = anotherContract.mintAndTransfer(msg.sender, group2[random()%(group2.length)],"100");
        } else if (r < 992) {
            cardId = anotherContract.mintAndTransfer(msg.sender, group3[random()%(group3.length)],"200");
        } else {
            cardId = anotherContract.mintAndTransfer(msg.sender, group4[random()%(group4.length)],"400");
        }
        emit DrawCardEvent(msg.sender,cardId);
    }

    function random() private view returns (uint256) {
        return uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))
        );
    }
}