// SPDX-License-Identifier:MIT
pragma solidity 0.8.24;
contract TestContract{
    function getMessage() public pure returns(string memory)
    {
        return "hi from Contract";
    }
}