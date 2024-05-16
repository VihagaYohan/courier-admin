import moment from "moment";

import BaseApi from "api/Api";

// endpoints
import Endpoints from "api/Endpoints";

// constants
import Constants from "../constants/constants";

// models
import { OrderTable } from "../models";

// get all orders
export const getAllOrders = async () => {
  try {
    let orderList: OrderTable[] = [];
    let response = await BaseApi.get(Endpoints.allOrders, {
      headers: {
        Authorization: Constants.token,
      },
    });
    if (response.status == 200) {
      const { data } = response.data;
      if (data.length > 0) {
        data.map((item) => {
          let order: OrderTable = {
            id: item._id,
            date: moment(item.createdOn).format("DD MMM YYYY"),
            trackingId: item.trackingId,
            sender: item.senderDetails.name,
            reciever: item.receiverDetails.name,
            type: "",
            amount: item.orderTotal,
            method: item.paymentType.name,
          };
          orderList.push(order);
        });
      }
      return orderList;
    } else {
      throw new Error("Unable to fetch orders");
    }
  } catch (e) {
    console.log("Unable to fetch orders");
  }
};

export default {
  getAllOrders,
};
