//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    //new player in the contract using array[] to unlimit number
    address[] public players;

    event NewPlayer(address player);

    function depositEth() public payable {
        require(msg.value >= 10 ether, 'You ow more money');
        players.push(payable(msg.sender));
        emit NewPlayer(msg.sender);
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
    }

}
