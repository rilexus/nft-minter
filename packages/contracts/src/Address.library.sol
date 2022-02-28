// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library Address {

    function isContract(address account) internal view returns(bool) {
        return account.code.length > 0;
    }

    function isZeroAddress(address account) internal view returns(bool) {
        return account == address(0);
    }

    function isSender(address account) internal view returns(bool) {
        return account == msg.sender;
    }

}