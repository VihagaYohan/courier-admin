import React, { Component, useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./barChart.scss";
import { OrderTable } from "models";
import { OrderService } from "services";
import moment from "moment";

const data = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [2022, 2023, 2024],
    },
  },
  series: [
    {
      name: "series-1",
      data: [1, 2, 1],
    },
  ],
};

const BarChart = () => {
  const [orders, setOrders] = useState<OrderTable[]>([]);
  const [years, setYears] = useState<string[]>([]);
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // fetch all orders
  const fetchAllOrders = async () => {
    try {
      let yearsList: string[] = [];
      let seriesList: string[] = [];
      const result = await OrderService.getAllOrders();
      if (result.length > 0) {
        result.map((item) => {
          yearsList.push(moment(item.date).year().toString());
        });
      }

      setYears([...yearsList]);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("");
    }
  };
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
