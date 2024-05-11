import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import "./dashboard.scss";

// components
import { Footer, Navbar, Menu } from "../../components";

const Dashboard = () => {
  return (
    <div className="main">
      <Navbar />

      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>

        <div className="contentContainer">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
