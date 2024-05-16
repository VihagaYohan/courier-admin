import React, { Component, useState, useEffect } from "react";
import { Dialog, DialogTitle, TextField, Button } from "@mui/material";
import "./login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Dialog open>
      <DialogTitle>Login</DialogTitle>

      <div style={{ padding: "10px" }}>
        <TextField
          label="Email address"
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        />

        <TextField
          label="Password"
          fullWidth
          style={{
            marginBottom: "10px",
          }}
          type="password"
        />

        <Button component={Link} to="/">
          Login
        </Button>
      </div>
    </Dialog>
  );
};

export default Login;
