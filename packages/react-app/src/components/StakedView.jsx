import React, { useState } from "react";

const { utils } = require("ethers");

export default function StakedView(props) {
  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: props.size ? props.size : 24,
        padding: 8,
        cursor: "pointer",
      }}
    >
      {props.balance}
    </span>
  );
}
