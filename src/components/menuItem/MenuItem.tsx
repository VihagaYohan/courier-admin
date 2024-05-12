import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import green from "@mui/material/colors/green";
import "./menuItem.scss";

// constants
import { Icons } from "../../constants";

interface propTypes {
  id: number;
  title: string;
  url: string;
  icon: any;
}

const MenuItem = (props: propTypes) => {
  const [iconColor, setIconColor] = useState("#2a3447");

  return (
    <Link
      to={props.url}
      className="listItem"
      key={`item ${props.id}`}
      onMouseOver={() => {
        setIconColor("white");
      }}
      onMouseLeave={() => {
        setIconColor("#2a3447");
      }}
    >
      {/*  <img src={listItem.icon} alt="" className="itemIcon" /> */}
      {/*  <Icons.HomeRounded color="primary" /> */}
      <props.icon
        //color="primary"
        style={{ color: iconColor }}
        sx={{
          "&:hover": { color: green },
        }}
      />
      <span className="listItemTitle">{props.title}</span>
    </Link>
  );
};

export default MenuItem;
