import React, { Component } from "react";
import "./button.scss";

// constants
import { Colors } from "../../constants";

const Button = ({ children, onClick, variant = "primary" }) => {
  const buttonClass = `btn btn-${variant}`;
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      style={{
        backgroundColor:
          variant == "primary" ? Colors.primaryColor : Colors.secondaryColor,
        color: Colors.whiteColor,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
