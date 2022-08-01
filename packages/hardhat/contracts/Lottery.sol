//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    //new player in the contract using array[] to unlimit number
    address[] public players;

    uint256 private _totalSupply;

    event NewPlayer(address player);

    function depositEth() public payable {
        require(msg.value >= 1 ether, 'You ow more money');
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
        // take %10 of the total supply for the devs
        uint devs = _totalSupply / 10;
        //send the winner the amount of the total supply minus the devs
        //pays the winner picked randomely
        payable (players[index]).transfer(_totalSupply - devs);
        //empies the old lottery and starts new one
        // pay the devs
        payable (address(0xD9B6D696B28C194fe011b0b8D3FC1ef4aD98dB36)).transfer(devs);
        players = new address[](0);
        // emty the totalSupply

        _totalSupply = 0;
    }

}
