import { Divider } from "antd";
import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import { Button, Card, CardHeader, CardText, CardTitle, Col, Row } from "reactstrap";

import { StakedView, Leaderboard } from "../components";

var Web3 = require("web3");

export default function ExampleUI({ address, tx, readContracts, writeContracts }) {
  const [totalSupply, settotalSupply] = useState([]);
  const [leaderBoard, setleaderBoard] = useState([]);
  const [lifetimeWinnings, setlifetimeWinnings] = useState(0);
  const [showMoreInfo, setshowMoreInfo] = useState(false);
  const [showHowToPlay, setshowHowToPlay] = useState(false);
  const [showStats, setshowStats] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // async function fetchData() {
    const result = await readContracts.Lottery.getTotalSupply();
    settotalSupply(utils.formatEther(result));

    const result2 = await readContracts.Lottery.getLeaderBoard();
    setleaderBoard(result2);

    const lw = await readContracts.Lottery.getLifetimeWinnings();
    setlifetimeWinnings(lw);
  }, [readContracts]);

  return (
    <div>
      <div
        style={{
          border: "1px solid #cccccc",
          padding: 26,
          width: "80%",
          margin: "auto",
          marginTop: 64,
          background: "light-blue",
        }}
      >
        <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#cc71c3" }}>
          {/* Info */}
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
          <Card>
            <CardHeader style={{ justifyContent: "center", background: "#ff9c92" }}>
              <CardTitle>
                <span
                  style={{
                    textShadow: "0px 0px 10px #cc71c3",
                    fontSize: "7em",
                    fontWeight: "bold",
                    color: "#ffe94d",
                  }}
                >
                  Scratch{" "}
                </span>
                <p> </p>
                <span
                  style={{
                    textShadow: "0px 0px 10px #cc71c3",
                    fontSize: "3em",
                    fontWeight: "bold",
                  }}
                >
                  A Transparent Gambling Platform
                </span>
              </CardTitle>
            </CardHeader>
            <CardText style={{ padding: "20px", background: "#5a9ded" }}>
              {/* <h4>
                {" "}
                <p>Welcome to Scratch!</p>{" "}
              </h4> */}
              <h6>
                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "20px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setshowMoreInfo(!showMoreInfo);
                      }}
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      What is Scratch?
                    </Button>
                  </div>
                  {showMoreInfo && (
                    <div
                      style={{
                        padding: "20px",
                        alignItems: "left",
                        backgroundColor: "#5a9ded",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ <b>Decentralized gambling platform </b>designed to be a means to an end for "unfair" or
                          "shady" betting experiences.
                        </span>
                      </p>
                      <div
                        style={{
                          padding: "20px",
                          alignItems: "left",
                          backgroundColor: "#5a9ded",
                        }}
                      >
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ Designed from the ground up to{" "}
                          <b>remove any possibilities of owner manipulation & foul play</b>
                        </span>
                      </div>

                      <span
                        style={{
                          textShadow: "0px 0px 10px #cc71c3",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        <p>
                          ✅ <b>Community owned and operated</b>
                        </p>
                      </span>

                      <div
                        style={{
                          padding: "20px",
                          alignItems: "left",
                          backgroundColor: "#5a9ded",
                        }}
                      >
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ✅ <b>Transparent.</b> Every transaction is public and can be viewed on the{" "}
                        </span>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          <a
                            style={{ color: "#ffe94d" }}
                            href="https://polygonscan.com/address/0x996a8cef4f2ceba8085ce6ee4d1e52b60ebf397a?fbclid=IwAR0WkoFULa7VhfYvHcP3C3Qh2ejn3Jpg3QpRAlTIj44Kq3fcbEs5Y9tdeyw"
                          >
                            Polyscan Blockchain
                          </a>{" "}
                          explorer.
                          <div
                            style={{
                              padding: "20px",
                              alignItems: "left",
                              backgroundColor: "#5a9ded",
                            }}
                          >
                            <p>
                              ✅ %100 open source and available on{" "}
                              <a style={{ color: "#ffe94d" }} href="https://github.com/JeffNeff/Scratch">
                                Github
                              </a>
                            </p>
                          </div>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setshowHowToPlay(!showHowToPlay);
                      }}
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      How to Play
                    </Button>
                  </div>
                  {showHowToPlay && (
                    <div
                      style={{
                        padding: "20px",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ☞ Players send tokens to a Smart Contract, via the "Buy an Entry" button below, in return for
                          entries into the lottery. <b>(10 tokens = 1 entry.)</b>
                        </span>
                      </p>

                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          ☞ Currently, a winner is selected twice a week ( every 3.5 days )
                        </span>
                      </p>

                      <p>
                        <span
                          style={{
                            textShadow: "0px 0px 10px #cc71c3",
                            fontSize: "1.5em",
                            fontWeight: "bold",
                          }}
                        >
                          ☞ Once the game is over, the winner is selected at random from a list of current players and
                          is alloted %100 of the total Prize pool.
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    border: "2px solid #cc71c3",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      border: "2px solid #cc71c3",
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      style={{
                        textShadow: "0px 0px 10px #cc71c3",
                        fontSize: "4.0em",
                        fontWeight: "bold",
                        backgroundColor: "#cc71c3",
                        WebkitBoxShadow: "0px 0px 10px black",
                      }}
                    >
                      Support
                    </Button>
                  </div>
                  <div
                    style={{
                      padding: "20px",
                      alignItems: "center",
                    }}
                  >
                    <p>
                      {" "}
                      <span
                        style={{
                          textShadow: "0px 0px 10px #cc71c3",
                          fontSize: "1.5em",
                          fontWeight: "bold",
                        }}
                      >
                        For questions or comments, please dont hesitate to contact us at:{" "}
                        <a style={{ color: "#ffe94d" }} href="mailto:SafeTradeIO@proton.me">
                          SafeTradeIO@proton.me
                        </a>
                        <p></p>
                        <p>
                          Or, join the community on{" "}
                          <a style={{ color: "#ffe94d" }} href="https://discord.gg/pHMTaNdvve">
                            Discord!
                          </a>
                        </p>
                      </span>
                    </p>
                  </div>
                </div>
              </h6>
            </CardText>
          </Card>
          {/* </div> */}
        </div>

        {/* Buy */}
        <div style={{ border: "2px solid #cccccc", padding: "40px", background: "#ff9c92" }}>
          <Button
            type="primary"
            style={{
              textShadow: "0px 0px 10px #cc71c3",
              fontSize: "4.0em",
              fontWeight: "bold",
              backgroundColor: "#cc71c3",
              WebkitBoxShadow: "0px 0px 10px black",
            }}
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
            <b>Buy an Entry</b>
          </Button>
        </div>

        <Row
          style={{
            border: "1px solid #cccccc",
            padding: 26,
            width: "100%",
            margin: "auto",
            marginTop: 64,
            background: "#cc71c3",
          }}
        >
          {/* <h1 style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#ff9c92", color: "#cc71c3" }}> */}{" "}
          <Button
            type="primary"
            style={{
              textShadow: "0px 0px 10px #cc71c3",
              fontSize: "4.0em",
              fontWeight: "bold",
              backgroundColor: "#cc71c3",
              WebkitBoxShadow: "0px 0px 10px black",
            }}
            onClick={() => {
              setshowStats(!showStats);
            }}
          >
            Stats
          </Button>
          {showStats && (
            <div style={{ border: "2px solid #cccccc", padding: "20px" }}>
              <Col>
                {/* Current Pot Total */}
                <div style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#5a9ded" }}>
                  <div style={{ padding: "20px", margin: 8, backgroundColor: "#5a9ded" }}>
                    <div style={{ margin: 8, backgroundColor: "#ff9c92" }}>
                      <h3>
                        {" "}
                        <span
                          style={{
                            color: "white",
                          }}
                        >
                          Current Pot Total
                        </span>
                      </h3>
                      <Card>
                        <div style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#5a9ded" }}>
                          <StakedView balance={totalSupply}></StakedView>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                {/* Lifetime Winnings */}
                <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#5a9ded" }}>
                  <div style={{ margin: 8, backgroundColor: "#ff9c92" }}>
                    <h3>
                      {" "}
                      <span
                        style={{
                          color: "white",
                        }}
                      >
                        Lifetime Winnings
                      </span>{" "}
                    </h3>
                    <div style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#5a9ded" }}>
                      <StakedView balance={utils.formatEther(lifetimeWinnings)}></StakedView>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                {/* Leaderboard */}
                <div style={{ border: "2px solid #cccccc", padding: "20px", background: "#5a9ded" }}>
                  <div style={{ margin: 8, backgroundColor: "#ff9c92" }}>
                    <h3>
                      {" "}
                      <span
                        style={{
                          color: "white",
                        }}
                      >
                        Leaderboard
                      </span>
                    </h3>
                    <Leaderboard leaderBoard={leaderBoard} />
                  </div>
                </div>
              </Col>
            </div>
          )}
        </Row>
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
      </div>
      <Divider />
    </div>
  );
}
