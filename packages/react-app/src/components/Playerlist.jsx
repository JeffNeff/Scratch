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

export default function Playerlist(props) {
  const { playerList } = props;
  var content = [];
  if (playerList.length > 0) {
    for (let i = 0; i < playerList.length; i++) {
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
                    textShadow: "0px 0px 10px #cc71c3",
                    fontSize: "1.5em",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Player:
                </span>
              </h3>
            </CardTitle>
            <CardText>
              <Row>
                <Col>
                  <span
                    style={{
                      textShadow: "0px 0px 10px #cc71c3",
                      fontSize: "1.0em",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {playerList[i]}
                  </span>{" "}
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
