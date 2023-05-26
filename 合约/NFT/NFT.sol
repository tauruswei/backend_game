// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MyNFT is  ERC721 {
    using SafeMath for uint256;
    struct NFT {
        // 卡牌编号
        string number;
        // 卡牌次数
        string chances;
    }

    NFT[] public nfts;

    mapping(uint256 => address) private _nftOwners;
    mapping(address => uint256[]) private _nftsByOwner;

    constructor() ERC721("Chess of Stars NFT", "CSNFT") {}
    // 由盲盒合约调用
    function mintAndTransfer(address to, string memory _number,string memory _chances) public returns (uint256){
        uint256 tokenId = nfts.length;
        nfts.push(NFT(_number, _chances));
        _safeMint(to, tokenId);
        // _nftOfOwner[to].push(NFT(_number, _chances));

        _nftOwners[tokenId] = to;
        _nftsByOwner[to].push(tokenId);

        return tokenId;
    }
    // 根据tokenid 查询 nft 信息
    function getNFT(uint256 tokenId) public view returns (NFT memory) {
        require(_exists(tokenId), "NFT does not exist");
        return nfts[tokenId];
    }
    // nft transfer
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_nftOwners[tokenId] == from, "Not the owner of the NFT");
        super.safeTransferFrom(from, to, tokenId);
        _nftOwners[tokenId] = to;
        uint256[] storage nftsByOwner = _nftsByOwner[from];
        for (uint i = 0; i < nftsByOwner.length; i++) {
            if (nftsByOwner[i] == tokenId) {
                nftsByOwner[i] = nftsByOwner[nftsByOwner.length - 1];
                nftsByOwner.pop();
                break;
            }
        }
        _nftsByOwner[to].push(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override  returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        string memory baseURI = "https://cosd1.s3.amazonaws.com/";
        return string(abi.encodePacked(baseURI,nfts[tokenId].number , ".png"));
    }
    // 查询 用户的 nft tokenids
    function getNftsByOwner() view public returns(uint256[] memory) {
        return _nftsByOwner[msg.sender];
    }
}