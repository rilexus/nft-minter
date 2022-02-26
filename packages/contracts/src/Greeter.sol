//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Storage.sol";

interface GreeterInterface {
    function some() external;
}

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory){
        console.log("[Greeter] greet called: ", greeting);
        return greeting;
    }

    function setValue(uint _value) public {
        Storage.setValue(_value);
    }

    function getValue() public view returns (uint) {
        return Storage.getValue();
    }

    fallback () external payable {
        greet();
    }

    function setGreeting(string memory _greeting) public payable {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
        console.log("Changing greeting from '%s'", greeting);
    }
}
