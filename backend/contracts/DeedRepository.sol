// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./ERC721/ERC721Token.sol";

/**
 * @title Repository of ERC721 Deeds
 * This contract contains the list of deeds registered by users.
 * This is a demo to show how tokens (deeds) can be minted and added
 * to the repository.
 */
contract DeedRepository is ERC721Token {
    /**
     * @dev Created a DeedRepository with a name and symbol
     * @param _name string represents the name of the repository
     * @param _symbol string represents the symbol of the repository
     */
    constructor(string memory _name, string memory _symbol)
        ERC721Token(_name, _symbol)
    {}

    /**
     * @dev Public function to register a new deed
     * @dev Call the ERC721Token minter
     * @param _tokenId uint256 represents a specific deed
     * @param _uri string containing metadata/uri
     */
    function registerDeed(uint256 _tokenId, string memory _uri) public {
        _mint(msg.sender, _tokenId);
        addDeedMetadata(_tokenId, _uri);
        emit DeedRegistered(msg.sender, _tokenId);
    }

    /**
     * @dev Public function to add metadata to a deed
     * @param _tokenId represents a specific deed
     * @param _uri text which describes the characteristics of a given deed
     * @return whether the deed metadata was added to the repository
     */
    function addDeedMetadata(uint256 _tokenId, string memory _uri)
        public
        returns (bool)
    {
        _setTokenURI(_tokenId, _uri);
        return true;
    }

    function countOwnedTokens() public view returns (uint256) {
        return ownedTokens[msg.sender][1];
    }

    /**
     * @dev Public function to retrieve all deeds owned by account
     */
    function fetchOwnedTokens()
        public
        view
        returns (uint256[] memory, string[] memory)
    {
        uint256 count = ownedTokens[msg.sender].length;
        uint256[] memory deedIds = new uint256[](count);
        string[] memory uris = new string[](count);

        for (uint256 i = 0; i < ownedTokens[msg.sender].length; i++) {
            deedIds[i] = ownedTokens[msg.sender][i];
            uris[i] = tokenURI(ownedTokens[msg.sender][i]);
        }

        return (deedIds, uris);
    }

    /**
     * @dev Event is triggered if deed/token is registered
     * @param _by address of the registrar
     * @param _tokenId uint256 represents a specific deed
     */
    event DeedRegistered(address _by, uint256 _tokenId);
}
