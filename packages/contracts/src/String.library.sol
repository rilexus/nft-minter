library String {
    function concat(string memory _a, string memory _b) internal pure returns (string memory) {
        return string(abi.encodePacked(_a, _b));
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/abdb20a6bdb1700d58ea9e01b7471dafdef52a68/contracts/utils/Strings.sol#L15

        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
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