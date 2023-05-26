pragma solidity ^0.8.0;
// 导入 OpenZeppelin 合约
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


// 定义一个 NFT 合约继承 ERC721 标准合约
contract MyNFT is ERC721 {
    // 存储每个 NFT 的图片 URL
    mapping (uint256 => string) private _tokenURIs;

    // 构造函数
    constructor() ERC721("MyNFT", "MNFT") {}

    // 定义一个创建 NFT 的函数
    function createNFT(address to, uint256 tokenId, string memory tokenURI) public {
        // 创建 NFT
        _mint(to, tokenId);

        // 关联 NFT 和图片 URL
        _setTokenURI(tokenId, tokenURI);
    }

    // 内部函数，用于关联 NFT 和图片 URL
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "MyNFT: token does not exist");
        _tokenURIs[tokenId] = _tokenURI;
    }

    // 返回指定 NFT 的图片 URL
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "MyNFT: token does not exist");
        // return _tokenURIs[tokenId];
        return string(abi.encodePacked(_tokenURIs[tokenId], uint256ToString(tokenId)));

    }
        // 外部函数，用于将 uint256 类型转换为字符串类型
    function uint256ToString(uint256 value) public pure returns (string memory) {
        uint256 temp = value;

        if (temp == 0) {
            return "0";
        }

        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }

        return string(buffer);
    }
}