// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Storage.library.sol";
import "./Address.library.sol";
import "./String.library.sol";

contract ERC721 {
    using Address for address;
    using String for uint256;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    constructor(string memory _name, string memory _symbol) {
        Storage.setName(_name);
        Storage.setSymbol(_symbol);
    }

    function _mint(address _to, uint256 _tokenId) internal virtual {
        require(_to != address(0), "ERC721: mint to the zero address");
        require(!_exists(_tokenId), "ERC721: token already minted");

        _beforeMint();

        Storage.setOwner(_tokenId, _to);
        Storage.setBalance(Storage.getBalance(_to) + 1, _to);

        emit Transfer(address(0), _to, _tokenId);

        _afterMint();
    }

    function _beforeMint() internal virtual {
        // called before every mint
    }

    function _afterMint() internal virtual {
        // called after every mint
    }

    function _exists(uint256 _tokenId) internal view returns (bool) {
        return Storage.getOwner(_tokenId) != address(0);
    }

    function _name() internal view virtual returns(string memory) {
        return Storage.getName();
    }

    function _symbol() internal view virtual returns(string memory) {
        return Storage.getSymbol();
    }

    function _balanceOf(address _of) internal view returns(uint256) {
        require(!_of.isZeroAddress(), "ERC721: balance for the zero address.");
        return Storage.getBalance(_of);
    }

    function _ownerOf(uint256 _tokenId) internal view returns(address){
        address owner = Storage.getOwner(_tokenId);
        require(!owner.isZeroAddress(), "ERC721: token does not exist.");

        return owner;
    }


    function _approve(address _to, uint256 _tokenId) internal {
        address owner = _ownerOf(_tokenId);
        require(owner.isSender(), "ERC721: Sender is not the owner of the token.");
        require(owner != _to, "ERC721: approval to owner");

        Storage.setApproval(_tokenId, _to);

        emit Approval(owner, _to, _tokenId);
    }

}