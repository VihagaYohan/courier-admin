import React, { Component } from "react";
import "./home.scss";

// layout
import { RecentOrders, ChartBox, BarChart } from "../../layout";

const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
        <RecentOrders />
      </div>
      <div className="box box2">
        <ChartBox title="Total Orders" count={10} />
      </div>
      <div className="box box3">
        <ChartBox title="Completed Orders" count={15} />
      </div>
      <div className="box box4">Box6</div>
      <div className="box box5">
        <ChartBox title="Processing" count={5} />
      </div>
      <div className="box box6">
        <ChartBox title="Total Earnings" count={100} />
      </div>
      <div className="box box7">
        <BarChart />
      </div>
      {/*  <div className="box box8">Box8</div>
      <div className="box box9">Box9</div> */}
    </div>
  );
};

export default Home;
