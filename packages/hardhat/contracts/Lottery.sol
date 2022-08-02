//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    //new player in the contract using array[] to unlimit number
    address[] public players;
    //Leaderboard of the contract containing the address of the player and the number of the tokens they have won.
    uint[] public  leaderboardWinnings;
    address[] public  leaderboardPlayers;
    uint public leaderboardCount;

    uint256 private _totalSupply;
    uint256 private _lifetimeWinnings;

    event NewPlayer(address player);

    function depositEth() public payable {
        require(msg.value >= 1 ether, 'You ow more money');
        players.push(payable(msg.sender));
        _totalSupply += msg.value;
        emit NewPlayer(msg.sender);
    }

    // getLifetimeWinnings() is a public function that returns the ammount of lifetime winnings
    function getLifetimeWinnings() public view returns (uint256) {
        return _lifetimeWinnings;
    }

    // getLeaderBoard is a public function that returns the leaderboard of the contract.
    function getLeaderBoard() public view returns ( address[] memory, uint[] memory) {
        return (leaderboardPlayers, leaderboardWinnings);
    }

    // getTotalSupply is a public function that returns the current total staked amount
    function getTotalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    //creates a random hash that will become our winner
    function random() private view returns(uint){
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    function addLeaderbaordWinner(address player, uint256 winnings) private {
       for (uint i = 0; i < leaderboardCount; i++) {
            if (leaderboardPlayers[i] == player) {
                leaderboardWinnings[i] += winnings;
                return;
            }
        }
        leaderboardPlayers.push(player);
        leaderboardWinnings.push(winnings);
        leaderboardCount++;
    }

    // function pickWinner() public restricted{
    function pickWinner() public onlyOwner {
        //creates index that is gotten from func random % play.len
        uint index = random() % players.length;
        // take %10 of the total supply for the devs
        uint devs = _totalSupply / 10;
        //send the winner the amount of the total supply minus the devs
        payable (players[index]).transfer(_totalSupply - devs);
        // pay the devs
        payable (address(0xD9B6D696B28C194fe011b0b8D3FC1ef4aD98dB36)).transfer(devs);
        // add the winner to the leaderboard
        addLeaderbaordWinner(players[index], (_totalSupply - devs));
        // add lifetime winnings to the counter
        _lifetimeWinnings += (_totalSupply - devs);
        // clear player list
        players = new address[](0);
        // emty the totalSupply
        _totalSupply = 0;
    }

}
