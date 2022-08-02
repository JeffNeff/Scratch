import { Button, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { Container, Card, CardActions, CardContent, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";
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
      <div style={{ border: "1px solid #cccccc", padding: 26, width: "80%", margin: "auto", marginTop: 64, background:"white" }}>
        <div style={{ border: "2px solid #cccccc", padding: "20px" }}>
          {/* Info */}
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
          <Card style={{ justifyContent: "center" }}>
            <CardHeader>
              <CardTitle>
                <h2>Scratch - The Internet's Defi Lottery</h2>
              </CardTitle>
            </CardHeader>
            <CardText>
              <p>Scratch is a decentralized lottery game that is built on the Polygon blockchain.</p>
              <p>Players can stake tokens, via this Dapp, to earn entries in the lottery. (10 tokens = 1 entry.)</p>
              <p>
                {" "}
                Once the game is over, the winner is selected at random from a list of current players and is alloted
                %90 of the total Prize pool.
              </p>
              <p>
                {" "}
                The contract can be viewed on the{" "}
                <a href="https://polygonscan.com/address/0x996a8cef4f2ceba8085ce6ee4d1e52b60ebf397a?fbclid=IwAR0WkoFULa7VhfYvHcP3C3Qh2ejn3Jpg3QpRAlTIj44Kq3fcbEs5Y9tdeyw">
                  Polyscan Blockchain
                </a>{" "}
                explorer:{" "}
              </p>
              <p>
                All of the source code for this Dapp is available on{" "}
                <a href="https://github.com/JeffNeff/Scratch">Github</a>
              </p>
            </CardText>
          </Card>
          {/* </div> */}

          {/* Buy */}
          <div style={{ border: "2px solid #cccccc", padding: "20px", background: "grey"}}>
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
        </div>
        {/* <Row xs="2">
          <Col className="bg-light border">Column</Col>
          <Col className="bg-light border">Column</Col>
          <Col className="bg-light border">Column</Col>
          <Col className="bg-light border">Column</Col>
        </Row> */}
        <Row>
          <Col>
            {/* Lifetime Winnings */}
            <div style={{ border: "2px solid #cccccc", padding: "20px"}}>
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
          </Col>
          <Col>
            {/* Leaderboard */}
            <div style={{ border: "2px solid #cccccc", padding: "20px" }}>
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
          </Col>
          <Col>
            {/* Current Pot Total */}
            <div style={{ border: "2px solid #cccccc", padding: "20px" }}>
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
          </Col>
          <Col>
            {/* Pickwinner */}
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
          </Col>
        </Row>
        {/* <div style={{ border: "2px solid #cccccc", padding: "10px" }}> */}
        {/* Button to Link user to view the code on github */}
        {/* <Button style={{ marginTop: 8 }} href="https://github.com/JeffNeff/Scratch">
            Get the Code!
          </Button> */}
        {/* <Events
            contracts={readContracts}
            contractName="Lottery"
            eventName="DepositEth"
            localProvider={localProvider}
            mainnetProvider={mainnetProvider}
            startBlock={0}
          /> */}
        {/* </div> */}
      </div>
      <Divider />

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in Lottery.sol! )
      */}
    </div>
  );
}
