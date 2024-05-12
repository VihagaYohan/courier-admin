import React, { Component, useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Dialog, DialogTitle, TextField } from "@mui/material";
import { Select, Option } from "@mui/base";
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
          Click Me
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
          initialValues={{ email: "", password: "" }}
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
                  label="Name"
                  variant="outlined"
                  size="small"
                  error={false}
                  style={{
                    marginBottom: "10px",
                  }}
                />

                <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  error={false}
                  style={{
                    marginBottom: "10px",
                  }}
                />

                <TextField
                  label="Phone number"
                  variant="outlined"
                  size="small"
                  type="number"
                  style={{
                    marginBottom: "10px",
                  }}
                />

                <Select>
                  <Option value="rider">Rider</Option>
                </Select>

                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default Home;
