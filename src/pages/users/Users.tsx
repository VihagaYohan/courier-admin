import React, { Component, useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
// import { Select, Option } from "@mui/base";
import { Formik } from "formik";
import "./users.scss";

// components
import { DataTable, Button, ActivityLoader } from "../../components";

// local data
import { userRows } from "../../data/data";

// redux
import { useAppDispatch, useAppSelector } from "../../store/store";
import { startLoading, stopLoading } from "../../store/slice/loaderSlice";

// service
import { UserService } from "../../services";
import { UserTable } from "models";

// table columns
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "type", headerName: "User Type", width: 80 },
];

const Home = () => {
  const dispatch = useAppDispatch();
  const { loadingState } = useAppSelector((state) => state.loader);
  const [users, setUsers] = useState<UserTable[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  //const [role, setRole] = useState<String>("");

  const handleChange = (event) => {
    //setRole(event.target.value.toString());
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // fetch all users
  const fetchAllUsers = async () => {
    try {
      dispatch(startLoading());
      const result = await UserService.getAllUsers();
      setUsers(result);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>

        <Button
          variant="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          New User
        </Button>
      </div>

      {users.length > 0 && loadingState == false ? (
        <DataTable columns={columns} rows={users} slug="users" />
      ) : (
        <ActivityLoader />
      )}

      <Dialog
        onClose={() => {
          console.log("close");
        }}
        open={open}
      >
        <DialogTitle>Create new user</DialogTitle>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            userRole: "rider",
          }}
          validate={(values) => {
            console.log(values);
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                }}
              >
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  error={false}
                  value="name"
                  style={{
                    marginBottom: "10px",
                  }}
                />

                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  error={false}
                  value="email"
                  style={{
                    marginBottom: "10px",
                  }}
                />

                <TextField
                  name="phoneNumber"
                  label="Phone number"
                  variant="outlined"
                  size="small"
                  value="phoneNumber"
                  style={{
                    marginBottom: "10px",
                  }}
                />

                <Select
                  label="User role"
                  value="userRole"
                  onChange={() => handleChange}
                  size="small"
                  name="userRole"
                >
                  <MenuItem value="rider">Delivery rider</MenuItem>
                </Select>

                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  size="small"
                  value="password"
                  style={{
                    marginBottom: "10px",
                  }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && errors.password}

                <Button variant="primary" onClick={() => console.log("form")}>
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default Home;
