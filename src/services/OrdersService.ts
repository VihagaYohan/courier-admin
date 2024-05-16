import moment from "moment";

import BaseApi from "api/Api";

// endpoints
import Endpoints from "api/Endpoints";

// constants
import Constants from "../constants/constants";

// models
import { CourierStatus, OrderResponse, OrderTable } from "../models";
import Riders from "models/Riders";

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
            type: "Standard",
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

// get order details by tracking Id
export const getOrderByTrackingId = async (trackingId: string) => {
  try {
    let response = await BaseApi.get(`${Endpoints.allOrders}/${trackingId}`, {
      headers: {
        Authorization: Constants.token,
      },
    });

    if (response.status == 200) {
      const { data } = response.data;
      console.log("order details goes here");

      let order: OrderResponse = {
        _id: data._id,
        status: data.status,
        rider: data.rider,
        courierType: data.courierType,
        packageType: data.packageType,
        trackingId: data.trackingId,
        packageSize: data.packageSize,
        senderDetails: data.senderDetails,
        receiverDetails: data.receiverDetails,
        orderTotal: data.orderTotal,
        paymentType: data.paymentType,
        createdOn: data.createdOn,
        __v: data.__v,
      };

      return order;
    } else {
      throw new Error("Unable to fetch order by tracking Id");
    }
  } catch (e) {
    console.log(e);
  }
};

// get all order status
export const getAllStatus = async () => {
  try {
    let statusList: CourierStatus[] = [];
    let response = await BaseApi.get(Endpoints.allCourierStatus, {
      headers: {
        Authorization: Constants.token,
      },
    });

    if (response.status == 200) {
      const { data } = response.data;
      if (data.length > 0) {
        data.map((item) => {
          let status: CourierStatus = {
            _id: item._id,
            name: item.name,
            createdAt: item.createdAt,
            __v: item.__v,
          };
          statusList.push(status);
        });
      }
      return statusList;
    } else {
      throw new Error("Unable to fetch courier statues");
    }
  } catch (e) {
    console.log(e);
  }
};

// get all order riders
export const getAllRiders = async () => {
  try {
    let ridersList: Riders[] = [];
    let response = await BaseApi.get(Endpoints.allUsers, {
      headers: {
        Authorization: Constants.token,
      },
    });

    if (response.status == 200) {
      const { data } = response.data;
      if (data.length > 0) {
        let result = data.filter((item) => item.role == "rider");

        return result;
      }
      return ridersList;
    } else {
      throw new Error("Unable to fetch courier statues");
    }
  } catch (e) {
    console.log(e);
  }
};

// update delivery rider
export const updateRider = async (id: string, payload) => {
  try {
    let response = await BaseApi.put(`${Endpoints.allOrders}/${id}/rider`, {
      headers: {
        Authorization: Constants.token,
      },
      body: {
        riderId: payload,
      },
    });

    if (response.status == 200) {
      console.log(response);
    } else {
      throw new Error("Unable to fetch order by tracking Id");
    }
  } catch (e) {
    console.log(e);
  }
};

// update order status
export const updateOrderStatus = async (id: string, payload) => {
  try {
    let response = await BaseApi.put(`${Endpoints.allOrders}/status/${id}`, {
      headers: {
        Authorization: Constants.token,
      },
      body: {
        status: {
          id: payload,
        },
      },
    });

    if (response.status == 200) {
      console.log(response);
    } else {
      throw new Error("Unable to fetch order by tracking Id");
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAllOrders,
  getOrderByTrackingId,
  getAllStatus,
  getAllRiders,
  updateRider,
  updateOrderStatus,
};
