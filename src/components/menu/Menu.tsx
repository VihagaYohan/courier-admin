import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./menu.scss";

// components
import { MenuItem } from "../";

// data
import { menu } from "../../data/data";

import { Icons } from "../../constants";

const Navbar = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <MenuItem
              id={listItem.id}
              title={listItem.title}
              url={listItem.url}
              icon={listItem.icon}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
