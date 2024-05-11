import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./chart.scss";

interface series {
  name: string;
  data: number[];
}

interface propTypes {
  options: {};
  series: series[];
  labels: string[];
}

const ChartComponent = ({ options, series, labels }: propTypes) => {
  return <div></div>;
};

export default ChartComponent;
