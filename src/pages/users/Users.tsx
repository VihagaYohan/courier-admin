import React, { Component, useState, useEffect } from "react";
import { GridColDef } from "@mui/x-data-grid";
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

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "type", headerName: "User Type", width: 80 },
];

const Home = () => {
  const dispatch = useAppDispatch();
  const { loadingState } = useAppSelector((state) => state.loader);
  const [users, setUsers] = useState<UserTable[]>([]);

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
            return;
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
    </div>
  );
};

export default Home;
