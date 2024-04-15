import React, { Component } from "react";
import "./style.css";

// components
import { UIHeader, UISidebar } from "../../components";

// pages
import Dashboard from "../Dashboard/dashboard-page";

const HomePage = () => {
  return (
    <div className="grid-container">
      <UIHeader />
      <UISidebar />
      <Dashboard />
    </div>
  );
};

export default HomePage;
