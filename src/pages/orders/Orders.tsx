import React, { Component } from "react";
import "./orders.scss";

// components
import { Button } from "../../components";

const Home = () => {
  return (
    <div className="home">
      <Button variant="primary" onClick={() => console.log("button clicked")}>
        Click me
      </Button>
    </div>
  );
};

export default Home;
