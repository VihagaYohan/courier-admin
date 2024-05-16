import BaseApi from "api/Api";

// endponints
import Endpoints from "api/Endpoints";

// models
import { User, Response, UserTable, UserRequest } from "../models";

const getAllUsers = async () => {
  try {
    let userList: UserTable[] = [];
    let response = await BaseApi.get(Endpoints.allUsers);
    console.log("user respnose");
    if (response.status == 200) {
      const { data } = response.data;
      if (data.length > 0) {
        data.map((item) => {
          let user: UserTable = {
            id: item._id,
            name: item.name,
            email: item.email,
            type: item.role,
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

// create new user
const addUser = async (payload: UserRequest) => {
  try {
    let response = await BaseApi.post(Endpoints.addUser, payload);
    console.log("user response");
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAllUsers,
  addUser,
};
