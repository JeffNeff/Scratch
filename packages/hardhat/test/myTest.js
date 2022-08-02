const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("Lottery", function () {
    it("Should deploy Lottery", async function () {
      const Lottery = await ethers.getContractFactory("Lottery");

      myContract = await Lottery.deploy();
    });

    describe("depositEth()", function () {
      it("Should be able to set up a new Player", async function () {
        // const newPlayer = await myContract.newPlayer(
        //   "0xD9B6D696B28C194fe011b0b8D3FC1ef4aD98dB36"
        // );

        // await myContract.setPlayer(newPlayer);
        // myContract.depositEth(ethers.utils.parseEther("0.1"));
        // const a = await myContract.address[0];
        // console.log(a);

        await myContract.depositEth(1000000000000000000);
        // await myContract.pickWinner();

        // const leaderboardWinnings = await myContract.getLeaderBoard();
        // console.log(leaderboardWinnings);

      });
    describe("pickWinner()", function () {
      it("Should be able to set up a new Player", async function () {
        // const newPlayer = await myContract.newPlayer(
        //   "0xD9B6D696B28C194fe011b0b8D3FC1ef4aD98dB36"
        // );

        // await myContract.setPlayer(newPlayer);
        // myContract.depositEth(ethers.utils.parseEther("0.1"));
        // const a = await myContract.address[0];
        // console.log(a);

        // await myContract.depositEth(1000000000000000000);
        await myContract.pickWinner();

        const lb = await myContract.getLeaderBoard();
        console.log(lb);
        expect(lb).to.be.an("array");
        // const leaderboardWinnings = await myContract.getLeaderBoard();
        // console.log(leaderboardWinnings);

      });
      // describe("pickWinner()", function () {
      //   it("Should be able to Pick a winner", async function () {

      //     // myContract.pickWinner();

      //     // const leaderboard = await myContract.getLeaderBoard();
      //     // console.log(leaderboard);

      //   });

      // it("Should emit a SetPlayer event ", async function () {
      //   const [owner] = await ethers.getSigners();

      //   const newPlayer = "Another Test Player";

      //   expect(await myContract.setPlayer(newPlayer))
      //     .to.emit(myContract, "SetPlayer")
      //     .withArgs(owner.address, newPlayer);
      // });
    });
  });
});
