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
          <CardBody>
            <CardTitle># {i + 1}</CardTitle>
            <CardText>
              <span>Account: ...{leaderBalances[i].slice(33)}</span>
              <span> Winnings : {leaderAccounts[i]}</span>
            </CardText>
          </CardBody>
        </Card>,
      );
    }
  }

  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: props.size ? props.size : 24,
        padding: 8,
        cursor: "pointer",
      }}
    >
      {content}
    </span>
  );
}
