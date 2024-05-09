import React, { useState } from "react";
import { AppBar, Box, CssBaseline, useMediaQuery } from "@mui/material";
import "./style.css";

// components
import { UIAppbar, UIDrawer } from "../../components";

const Dashboard = () => {
  const [open, setOpen] = useState();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <UIAppbar />
    </Box>
  );
};

export default Dashboard;
