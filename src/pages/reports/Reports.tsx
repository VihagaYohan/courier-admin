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
import "./reports.scss";

// components
import { DataTable, Button, ActivityLoader } from "../../components";

// local data
import { userRows } from "../../data/data";

// redux
import { useAppDispatch, useAppSelector } from "../../store/store";
import { startLoading, stopLoading } from "../../store/slice/loaderSlice";

// service
import { OrderService } from "../../services";
import { OrderTable, UserTable } from "models";

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
  { field: "date", headerName: "Date", width: 100 },
  { field: "trackingId", headerName: "Tracking Id", width: 100 },

  { field: "amount", headerName: "Amount (Rs.)", width: 200 },
  { field: "method", headerName: "Payment Method", width: 200 },
];

const Home = () => {
  const dispatch = useAppDispatch();
  const { loadingState } = useAppSelector((state) => state.loader);
  const [orders, setOrders] = useState<OrderTable[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // fetch all orders
  const fetchAllOrders = async () => {
    try {
      dispatch(startLoading());
      const result = await OrderService.getAllOrders();
      setOrders(result);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="users">
      <div className="info">
        <h1>Orders</h1>
      </div>

      {orders.length > 0 && loadingState == false ? (
        <DataTable columns={columns} rows={orders} slug="orders" />
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
          onSubmit={(values) => {}}
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
