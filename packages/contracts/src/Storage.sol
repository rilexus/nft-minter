pragma solidity ^0.8.0;

struct AppStorage {
    uint value;
}

library Storage {
    function get() internal pure returns (AppStorage storage s) {
        bytes32 key = keccak256("some-random-key");
        assembly {
            s.slot := key
        }
    }

    function setValue(uint _value) internal {
        AppStorage storage srg = get();
        srg.value = _value;
    }

    function getValue() internal view returns(uint){
        return get().value;
    }
}