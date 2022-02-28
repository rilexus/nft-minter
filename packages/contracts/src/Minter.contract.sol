// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721.contract.sol";


contract Minter is ERC721 {

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(address _to, uint256 _tokenId) public {
        _mint(_to, _tokenId);
    }

    function ownerOf(uint256 _tokenId) public view returns(address){
        return _ownerOf(_tokenId);
    }

    function name() public view returns(string memory) {
        return _name();
    }

    function symbol() public view returns(string memory) {
        return _symbol();
    }

    function balanceOf(address _of) public view returns(uint256) {
        return _balanceOf(_of);
    }

    function approve(address _to, uint256 _tokenId) public {
        _approve(_to, _tokenId);
    }
}