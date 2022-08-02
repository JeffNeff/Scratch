import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
// import { SyncOutlined } from "@ant-design/icons";
// import { StakedView } from "../components/index";

import { StakedView, Leaderboard } from "../components";

var Web3 = require("web3");

export default function ExampleUI({
  // purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [totalSupply, settotalSupply] = useState([]);
  const [leaderBoard, setleaderBoard] = useState([]);
  const [lifetimeWinnings, setlifetimeWinnings] = useState(0);

  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <div style={{ border: "2px solid #cccccc" }}>
          <div style={{ margin: 8 }}>
            <h3> Lifetime Winnings: </h3>
            <span>{utils.formatEther(lifetimeWinnings)}</span>
          </div>
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              // 📟 fetch the total supply of the contract
              const lw = await readContracts.Lottery.getLifetimeWinnings();
              setlifetimeWinnings(lw);
            }}
          >
            Refresh
          </Button>
        </div>
        <div style={{ border: "2px solid #cccccc" }}>
          <div style={{ margin: 8 }}>
            <h3> Leaderboard: </h3>
            <div style={{ margin: 8 }}>
              <Leaderboard leaderBoard={leaderBoard} />
              <Button
                style={{ marginTop: 8 }}
                onClick={async () => {
                  // 📟 fetch the total supply of the contract
                  const lb = await readContracts.Lottery.getLeaderBoard();
                  setleaderBoard(lb);
                  // 📟 fetch the balance of the contract
                  // console.log("leaderBoard", lb);
                }}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
        <div style={{ border: "2px solid #cccccc" }}>
          <div style={{ margin: 8 }}>
            <div style={{ margin: 8 }}>
              <h3>Current Pot Total:</h3>
              <Card>
                <div style={{ margin: 8 }}>
                  <StakedView balance={totalSupply}></StakedView>
                </div>
                <div style={{ margin: 8 }}>
                  <Button
                    style={{ marginTop: 8 }}
                    onClick={async () => {
                      // 📟 fetch the total supply of the contract
                      const totalSupply = await readContracts.Lottery.getTotalSupply();
                      // 📟 fetch the balance of the contract
                      // console.log("totalSupply", totalSupply._hex);
                      settotalSupply(utils.formatEther(totalSupply));
                    }}
                  >
                    Refresh
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div style={{ border: "2px solid #cccccc", padding: "10px" }}>
          <Button
            onClick={async () => {
              const result = tx(
                writeContracts.Lottery.depositEth({
                  value: Web3.utils.toWei("10", "ether"),
                  nonce: 0,
                }),
                update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                },
              );
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Buy an Entry
          </Button>
        </div>
        {/* only render this div if the logged in account is the owner */}
        {address == "0xD9B6D696B28C194fe011b0b8D3FC1ef4aD98dB36" && (
          <div style={{ border: "2px solid #cccccc", padding: "10px" }}>
            <Button
              style={{ marginTop: 8 }}
              onClick={async () => {
                const result = tx(writeContracts.Lottery.pickWinner(), update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                });
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
              }}
            >
              Pick Winner
            </Button>
          </div>
        )}

        <div style={{ border: "2px solid #cccccc", padding: "10px" }}>
          {/* Button to Link user to view the code on github */}
          <Button style={{ marginTop: 8 }} href="https://github.com/JeffNeff/Scratch">
            Get the Code!
          </Button>
          {/* <Events
            contracts={readContracts}
            contractName="Lottery"
            eventName="DepositEth"
            localProvider={localProvider}
            mainnetProvider={mainnetProvider}
            startBlock={0}
          /> */}
        </div>
      </div>
      <Divider />

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in Lottery.sol! )
      */}
    </div>
  );
}
