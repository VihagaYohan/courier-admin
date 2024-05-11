import React, { Component } from "react";
import "./chartBox.scss";

interface propTypes {
  title: string;
  count: number;
}

const ChartBox = ({ title, count }: propTypes) => {
  return (
    <div className="chartbox">
      <span className="title">{title}</span>
      <span className="count">{count}</span>
    </div>
  );
};

export default ChartBox;
