import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./barChart.scss";

const data = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

const BarChart = () => {
  return (
    <div>
      <h1>Courier Orders</h1>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};

export default BarChart;
