import React, { Component, useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button as MuiButton,
  Alert,
} from "@mui/material";
// import { Select, Option } from "@mui/base";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Close";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
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

// form validation
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address"),
  phoneNumber: Yup.string().required("Phone number required"),
  password: Yup.string().min(4).required("Password is required"),
  userRole: Yup.string().required("User role required"),
});

// table columns
const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "type", headerName: "User Type", width: 80 },
];

interface payloadInterface {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

const Home = () => {
  const dispatch = useAppDispatch();
  const { loadingState } = useAppSelector((state) => state.loader);
  const [users, setUsers] = useState<UserTable[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  //const [role, setRole] = useState<String>("");

  const notify = () => toast.success(" User has been added");

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

  // add new user
  const handleAddUser = async (payload: payloadInterface) => {
    try {
      let response = await UserService.addUser(payload);
      notify();
      fetchAllUsers();
      setOpen(false);
    } catch (e) {
      console.log(e);
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

      {/* add new record (user) */}
      <Dialog
        onClose={() => {
          console.log("close");
        }}
        open={open}
        style={{
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "10px",
          }}
          onClick={() => setOpen(false)}
        >
          <DialogTitle>Add new user</DialogTitle>
          <RemoveIcon fontSize="inherit" />
        </div>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            userRole: "rider",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let payload: payloadInterface = {
              name: values.name,
              email: values.email,
              phoneNumber: values.phoneNumber,
              password: values.password,
              role: values.userRole,
            };
            handleAddUser(payload);
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
            <Form>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                // as={TextField}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.name) && touched.name}
                helperText={touched.name && errors.name}
                style={{
                  marginBottom: "10px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
              />

              <TextField
                name="phoneNumber"
                label="Phone number"
                variant="outlined"
                //as={TextField}
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.phoneNumber) && touched.phoneNumber}
                helperText={errors.phoneNumber}
                style={{
                  marginBottom: "10px",
                  marginRight: "10px",
                }}
              />
              <br />

              <TextField
                name="email"
                label="Email"
                variant="outlined"
                //fullWidth
                // as={TextField}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email) && touched.email}
                helperText={touched.email && errors.email}
                style={{
                  marginBottom: "10px",
                  marginLeft: "10px",
                  width: "400px",
                }}
              />

              <br />
              <TextField
                name="password"
                label="Password"
                variant="outlined"
                // as={TextField}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password) && touched.password}
                helperText={errors.password}
                style={{
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
              />

              <TextField
                name="userRole"
                label="User role"
                variant="outlined"
                //as={TextField}
                value={values.userRole}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.userRole) && touched.userRole}
                helperText={errors.userRole}
                disabled
                style={{
                  marginBottom: "10px",
                  marginLeft: "10px",
                }}
              />

              <br />

              <MuiButton
                color="primary"
                variant="contained"
                type="submit"
                style={{
                  marginLeft: "10px",
                  width: "400px",
                  marginBottom: "10px",
                }}
              >
                Submit
              </MuiButton>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default Home;
