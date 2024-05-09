import React, { Component } from "react";
import "./style.css";

// components
import {
  UITypography,
  UIButton,
  UITextField,
  UILayout,
} from "../../components";

// pages
import Dashboard from "../Dashboard/dashboard-page";

const HomePage = () => {
  return (
    <div className="grid-container">
      {/* <UITypography /> */}
      {/* <UIButton /> */}
      {/* <UITextField /> */}
      <UILayout />
    </div>
  );
};

export default HomePage;
