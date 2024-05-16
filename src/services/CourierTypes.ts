import BaseApi from "api/Api";

// endponints
import Endpoints from "api/Endpoints";

// models
import {
  User,
  Response,
  UserTable,
  UserRequest,
  CourierTypes,
} from "../models";
import { CourierType } from "models/Order";

const getAllCourierTypes = async () => {
  try {
    let userList: CourierTypes[] = [];
    let response = await BaseApi.get(Endpoints.allCourierTypes);
    if (response.status == 200) {
      const { data } = response.data;
      if (data.length > 0) {
        data.map((item) => {
          let user: CourierTypes = {
            _id: item._id,
            name: item.name,
            createdAt: item.createdAt,
            __v: item.__v,
          };

          userList.push(user);
        });
      }

      return userList;
    } else {
      throw new Error("Unable to fetch users");
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAllUsers: getAllCourierTypes,
};
