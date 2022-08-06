//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    // players contains the address of the current players
    address[] public players;
    // Leaderboard of the contract containing the address of the player and the number of the tokens they have won.
    uint[] public  leaderboardWinnings;
    // leaderboardPlayers contains the address of the players in the leaderboard.
    address[] public  leaderboardPlayers;
    // leaderboardCount contains the number of players in the leaderboard.
    uint public leaderboardCount;
    // _totalSupply contains the total number of tokens in the contract.
    uint256 private _totalSupply;
    // _lifetimeWinnings contains the total number of tokens won players.
    uint256 private _lifetimeWinnings;

    // NewPlayer is an event that is emited when a new player joins the contract.
    event NewPlayer(address player);

    // depositEth() is a public function that allows the player to deposit tokens into the contract to enter the game.
    function depositEth() public payable {
        // The player is required to send > 10 tokens to play.
        require(msg.value >= 10 ether, 'You ow more money');
        // The player is added to the players array.
        players.push(payable(msg.sender));
        // the totalSupply is increased by the amount of tokens sent.
        _totalSupply += msg.value;
        // The NewPlayer event is emited.
        emit NewPlayer(msg.sender);
    }

    // addPaypalUser() is a public function that allows new raffle entries to be added to the contract.
    function addPaypalUser(address player) public payable{
        // required to send > 10 tokens to play.
        require(msg.value >= 10 ether, 'You ow more money');
        // The player is added to the players array.
        players.push(player);
        // the totalSupply is increased by 10 tokens.
        _totalSupply += 10;
        // The NewPlayer event is emited.
        emit NewPlayer(player);
    }

    // addAffliatePlayerEntry is a public function that allows the owner of the contract to give affiliate players entries into the game.
    function addAffliatePlayerEntry(address player) public onlyOwner{
        // The player is added to the players array.
        players.push(player);
        // The NewPlayer event is emited.
        emit NewPlayer(player);
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

    // random() is a private function that returns a random number between 0 and the number of players.
    function random() private view returns(uint){
        return  uint (keccak256(abi.encode(block.timestamp,  players)));
    }

    // addLeaderbaordWinner() is a private function that adds a player to the leaderboard.
    function addLeaderbaordWinner(address player, uint256 winnings) private {
        // illterate through the leaderboardPlayers array.
       for (uint i = 0; i < leaderboardCount; i++) {
            // if the player is already in the leaderboard, the winnings are added to the existing winnings.
            if (leaderboardPlayers[i] == player) {
                leaderboardWinnings[i] += winnings;
                return;
            }
        }
        // if the player is not in the leaderboard, the player is added to the leaderboard.
        leaderboardPlayers.push(player);
        // the winnings are added to the leaderboardWinnings array.
        leaderboardWinnings.push(winnings);
        // the leaderboardCount is increased by 1.
        leaderboardCount++;
    }

    // pickWinner() is a public function that only the owner can call.
    // this function selects a winner from the [] of players.
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
