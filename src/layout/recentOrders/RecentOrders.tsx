import React, { Component } from "react";
import "./recentOrders.scss";

import { topDealUsers } from "../../data/data";

const RecentOrders = () => {
  return (
    <div className="recentOrders">
      <h1>Recent Orders</h1>
      <div className="list">
        {topDealUsers.map((item) => (
          <div className="listItem" key={item.id}>
            <div className="order">
              <img src={item.img} alt="image" />
              <div className="userTexts">
                <span className="username">{item.username}</span>
                <span className="email">{item.email}</span>
              </div>
            </div>
            <span className="amount">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
