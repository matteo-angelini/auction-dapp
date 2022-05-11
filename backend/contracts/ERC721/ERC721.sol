// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

import "./ERC721Basic.sol";

/**
 * @title ERC-721 Non-Fungible Token Standard, optional enumeration extension
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
abstract contract ERC721Enumerable is ERC721Basic {
    function totalSupply() public view virtual returns (uint256);

    function tokenOfOwnerByIndex(address _owner, uint256 _index)
        public
        view
        virtual
        returns (uint256 _tokenId);

    function tokenByIndex(uint256 _index) public view virtual returns (uint256);
}

/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
abstract contract ERC721Metadata is ERC721Basic {
    function name() public view virtual returns (string memory _name);

    function symbol() public view virtual returns (string memory _symbol);

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        returns (string memory);
}

/**
 * @title ERC-721 Non-Fungible Token Standard, full implementation interface
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
abstract contract ERC721 is ERC721Basic, ERC721Enumerable, ERC721Metadata {

}
