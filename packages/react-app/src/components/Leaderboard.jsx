import React, { useState } from "react";

import {
  Card,
  Button,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  CardHeader,
  CardFooter,
  CardLink,
  CardGroup,
  Row,
  Col,
} from "reactstrap";

const { utils } = require("ethers");

export default function Leaderboard(props) {
  const { leaderBoard } = props;
  var leaderBoardList = [];
  var content = [];
  var leaderAccounts = [];
  var leaderBalances = [];
  for (let i = 0; i < leaderBoard.length; i++) {
    for (let j = 0; j < leaderBoard[i].length; j++) {
      console.log("--");
      console.log(leaderBoard[i][j]);
      if (utils.isAddress(leaderBoard[i][j])) {
        leaderBalances.push(leaderBoard[i][j]);
      } else {
        leaderAccounts.push(utils.formatEther(leaderBoard[i][j]._hex));
      }
    }
  }
  console.log("leaderBalances", leaderBalances);
  console.log("leaderAccounts", leaderAccounts);

  // console.log(leaders);
  // sort the leaders by winnings

  // console.log("leaderBoardList", leaderBoardList);
  if (leaderAccounts.length > 0) {
    for (let i = 0; i < leaderAccounts.length; i++) {
      content.push(
        <Card key={i}>
          <CardBody style={{ backgroundColor: "#ff9c92" }}>
            <CardTitle
              style={{
                fontSize: "24px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              <h3>
                <span
                  style={{
                    color: "#cc71c3",
                  }}
                >
                  # {i + 1}
                </span>
              </h3>
            </CardTitle>
            <CardText>
              <Row>
                <Col>
                  <span
                    style={{
                      color: "#cc71c3",
                    }}
                  >
                    <b>Account:</b>
                  </span>{" "}
                  <p>
                    <span
                      style={{
                        color: "White",
                      }}
                    >
                      ...{leaderBalances[i].slice(33)}
                    </span>
                  </p>
                </Col>
                <Col>
                  <span>
                    {" "}
                    <span
                      style={{
                        color: "#cc71c3",
                      }}
                    >
                      <b>Winnings:</b>{" "}
                    </span>
                    <p>
                      <span
                        style={{
                          color: "White",
                        }}
                      >
                        {leaderAccounts[i]}
                      </span>
                    </p>
                  </span>
                </Col>
              </Row>
            </CardText>
          </CardBody>
        </Card>,
      );
    }
  }

  return (
    <div style={{ border: "2px solid #cccccc", padding: "20px", backgroundColor: "#5a9ded" }}>
      <span
        style={{
          verticalAlign: "middle",
          fontSize: props.size ? props.size : 24,
          padding: 8,
          cursor: "pointer",
          backgroundColor: "#5a9ded",
        }}
      >
        {content}
      </span>
    </div>
  );
}
