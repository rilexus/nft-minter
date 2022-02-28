pragma solidity ^0.8.0;

struct AppStorage {
    string name;
    string symbol;

    // Mapping from token ID to owner address
    mapping(uint256 => address) owners;

    // Mapping owner address to token count
    mapping(address => uint256) balances;

    mapping(uint256 => address) approvals;
}

library Storage {
    function get() internal pure returns (AppStorage storage s) {
        bytes32 key = keccak256("some-random-key");
        assembly {
            s.slot := key
        }
    }

    function setBalance(uint256 _amount, address _to) internal {
        AppStorage storage strg = get();
        strg.balances[_to] = _amount;
    }

    function getBalance(address _of) internal view returns(uint256) {
        return get().balances[_of];
    }

    function setOwner(uint256 _tokenId, address _owner) internal {
        AppStorage storage strg = get();
        strg.owners[_tokenId] = _owner;

    }

    function getOwner(uint256 _tokenId) internal view returns(address){
        return get().owners[_tokenId];
    }

    function getName() internal view returns(string memory) {
        return get().name;
    }

    function setName(string memory _name) internal {
        AppStorage storage strg = get();
        strg.name = _name;
    }

    function getSymbol() internal view returns(string memory) {
        return get().symbol;
    }

    function setSymbol(string memory _symbol) internal {
        AppStorage storage strg = get();
        strg.symbol = _symbol;
    }

    function getApproval(uint256 _tokenId) internal view returns(address) {
        return get().approvals[_tokenId];
    }

    function setApproval(uint256 _tokenId, address _to) internal {
        AppStorage storage strg = get();
        strg.approvals[_tokenId] = _to;
    }
}