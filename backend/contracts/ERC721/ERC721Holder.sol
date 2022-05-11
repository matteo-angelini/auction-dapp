// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

import "./ERC721Receiver.sol";

contract ERC721Holder is ERC721Receiver {
    function onERC721Received(
        address,
        uint256,
        bytes memory
    ) public pure override returns (bytes4) {
        return ERC721_RECEIVED;
    }
}
