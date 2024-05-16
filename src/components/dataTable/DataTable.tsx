import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbar,
  renderActionsCell,
  GridColDef,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import RemoveIcon from "@mui/icons-material/Close";
import moment from "moment";

// service
import { OrderService, UserService } from "services";
import { bool } from "prop-types";
import { CourierStatus, OrderResponse } from "models";
import Riders from "models/Riders";

interface propTypes {
  columns: GridColDef[];
  rows: object[];
  slug: string;
}

// form validation
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address"),
  phoneNumber: Yup.string().required("Phone number required"),
  password: Yup.string().min(4).required("Password is required"),
  userRole: Yup.string().required("User role required"),
});

const DataTable = ({ columns, rows, slug }: propTypes) => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<OrderResponse>();
  const [status, setStatus] = useState<CourierStatus[]>([]);
  const [riders, setRiders] = useState<Riders[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>();
  const [currentRider, setCurrentRider] = useState<string>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const notify = () => toast.success(" Record has been updated");

  useEffect(() => {
    fetchAllStatus();
    fetchAllRiders();
  }, []);

  // handle delete record
  const handleDelete = async (slug: string, id: string) => {
    try {
      if (slug == "users") {
        // remove user
        await UserService.removeUser(id);
      }

      notify();
    } catch (e) {
      console.log(e);
    }
  };

  // fetch view details
  const handleViewDetails = async (slug: string, id: string) => {
    try {
      if (slug == "users") {
        // remove user
        await UserService.removeUser(id);
      } else if (slug == "orders") {
        // fetch order by tracking Id
        let response = await OrderService.getOrderByTrackingId(id);
        setCurrentOrder(response);
        setLoaded(true);
        // setCurrentStatus(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // fetch all status
  const fetchAllStatus = async () => {
    try {
      let response = await OrderService.getAllStatus();
      setStatus(response);
    } catch (e) {
      console.log(e);
    }
  };

  // fetch all riders
  const fetchAllRiders = async () => {
    try {
      let response = await OrderService.getAllRiders();
      setRiders(response);
    } catch (e) {
      console.log(e);
    }
  };

  // update delivery rider
  const updateDeliveryRider = async () => {
    try {
      let response = await OrderService.updateRider(
        currentOrder._id,
        currentOrder
      );
    } catch (e) {
      console.log(e);
    }
  };

  // update order status
  const updateOrderStatus = async () => {
    try {
      let response = await OrderService.updateRider(
        currentOrder._id,
        currentStatus
      );
    } catch (e) {
      console.log(e);
    }
  };

  // handle update
  const handleUpdate = async () => {
    try {
      await updateOrderStatus();
      await updateDeliveryRider();

      notify();
    } catch (e) {
      console.log(e);
    }
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          {/*  <Link to={`/${slug}/${params.row.id}`}>
            <img
              src="/view.svg"
              alt="view"
              onClick={() => console.log("view")}
            />
          </Link> */}
          <div onClick={() => setOpen(true)}>
            <img
              src="/view.svg"
              alt="view"
              onClick={() => handleViewDetails(slug, params.row.trackingId)}
            />
          </div>

          <div
            className="delete"
            onClick={() => handleDelete(slug, params.row.id)}
          >
            <img src="/delete.svg" alt="delete" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableDensitySelector
        rowSelection={true}
        disableRowSelectionOnClick
      />

      {/* update form  */}
      {loaded == true && (
        <Dialog
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
            <DialogTitle>{`Update order ${currentOrder?.trackingId}`}</DialogTitle>
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
                {/* sender name */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 10px",
                  }}
                >
                  <Typography variant="body1">Sender Name </Typography>
                  <Typography variant="body2">
                    {currentOrder?.senderDetails.name}
                  </Typography>
                </div>

                {/* receiver name */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 10px",
                  }}
                >
                  <Typography variant="body1">Reciver Name </Typography>
                  <Typography variant="body2">
                    {currentOrder.receiverDetails.name}
                  </Typography>
                </div>

                {/* rider */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 10px",
                  }}
                >
                  <Typography variant="body1">Delivered by </Typography>
                  <Typography variant="body2">
                    {currentOrder.rider.name}
                  </Typography>
                </div>

                {/* created on */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0px 10px",
                  }}
                >
                  <Typography variant="body1">Created On </Typography>
                  <Typography variant="body2">
                    {moment(currentOrder.createdOn).format("DD MMM YYYY")}
                  </Typography>
                </div>

                {/* status */}
                <InputLabel
                  style={{
                    padding: "10px 10px 0px 10px",
                  }}
                >
                  Courier status
                </InputLabel>
                <Select
                  value={currentStatus}
                  style={{
                    margin: "10px",
                    width: "400px",
                  }}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                >
                  {status.map((item) => {
                    return (
                      <MenuItem value={item._id} key={`item-${item._id}`}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <br />

                {/* riders */}
                <InputLabel
                  style={{
                    padding: "10px 10px 0px 10px",
                  }}
                >
                  Delivery riders
                </InputLabel>
                <Select
                  value={currentRider}
                  style={{
                    margin: "10px",
                    width: "400px",
                  }}
                  onChange={(e) => setCurrentRider(e.target.value)}
                >
                  {riders.map((item) => {
                    return (
                      <MenuItem value={item._id} key={`item-${item._id}`}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <br />

                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  style={{
                    marginLeft: "10px",
                    width: "400px",
                    marginBottom: "10px",
                  }}
                  onClick={() => handleUpdate()}
                >
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </Dialog>
      )}
    </div>
  );
};

export default DataTable;
