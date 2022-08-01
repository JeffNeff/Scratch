//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    //new player in the contract using array[] to unlimit number
    address[] public players;

    uint256 private _totalSupply;

    event NewPlayer(address player);

    function depositEth() public payable {
        require(msg.value >= 10 ether, 'You ow more money');
        players.push(payable(msg.sender));
        _totalSupply += msg.value;
        emit NewPlayer(msg.sender);
    }

    // getTotalSupply is a public function that returns the current total staked amount
    function getTotalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    //creates a random hash that will become our winner
    function random() private view returns(uint){
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    // function pickWinner() public restricted{
    function pickWinner() public onlyOwner {
        //only the manager can pickWinner
        //require(msg.sender == manager);
        //creates index that is gotten from func random % play.len
        uint index = random() % players.length;
        //pays the winner picked randomely
        payable (players[index]).transfer(address(this).balance);
        //empies the old lottery and starts new one
        players = new address[](0);
        // emty the totalSupply
        _totalSupply = 0;
    }

}
