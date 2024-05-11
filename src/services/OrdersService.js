import BaseApi from "api/Api";

// endpoints
import Endpoints from "api/Endpoints";

// get all orders
export const getAllOrders = async () => {
  try {
    let response = await BaseApi.get(Endpoints.allOrders);
    console.log("response goes here");
    console.log(response.data);
  } catch (e) {
    console.log("Unable to fetch orders");
  }
};

export default {
  getAllOrders,
};
