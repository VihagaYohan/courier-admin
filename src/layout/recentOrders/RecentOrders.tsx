import React, { Component, useState, useEffect } from "react";
import "./recentOrders.scss";

import { topDealUsers } from "../../data/data";

// model
import { OrderTable } from "models";

// service
import { OrderService } from "../../services/index";

const RecentOrders = () => {
  const [orders, setOrders] = useState<OrderTable[]>([]);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // fetch all orders
  const fetchAllOrders = async () => {
    try {
      const result = await OrderService.getAllOrders();
      setOrders(result);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("");
    }
  };

  return (
    <div className="recentOrders">
      <h1>Recent Orders</h1>
      <div className="list">
        {orders.map((item: OrderTable) => (
          <div className="listItem" key={item.id}>
            <div className="order">
              <div className="userTexts">
                <span className="username">{item.sender}</span>
                <span className="email">ID - {item.trackingId}</span>
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
