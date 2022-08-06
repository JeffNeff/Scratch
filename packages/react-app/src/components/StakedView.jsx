import React, { useState } from "react";

import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const { utils } = require("ethers");

export default function StakedView(props) {
  return (
    <Card key="accnt">
      <CardBody style={{ backgroundColor: "#ff9c92", padding: "20px" }}>
        <CardText>
          <span
            style={{
              textShadow: "0px 0px 10px #cc71c3",
              fontSize: "2.0em",
              fontWeight: "bold",
              color: "white",
            }}
          >
            <b>{props.balance} / Matic</b>
          </span>
        </CardText>
      </CardBody>
    </Card>
  );
}
