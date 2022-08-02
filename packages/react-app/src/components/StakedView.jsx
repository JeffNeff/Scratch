import React, { useState } from "react";

const { utils } = require("ethers");

export default function StakedView(props) {
  return (
    <span
      style={{
        fontSize: props.size ? props.size : 24,
        cursor: "pointer",
        backgroundColor: "#ff9c92",
        color: "white",
        padding: "25px",
      }}
    >
      {props.balance}{" "}
      <span
        style={{
          color: "black",
        }}
      >
        /
      </span>
      <span
        style={{
          padding: "4px",
          fontSize: props.size ? props.size : 24,
          cursor: "pointer",
          // backgroundColor: "#5a9ded",
          color: "#cc71c3",
        }}
      >
        Matic
      </span>
    </span>
  );
}
