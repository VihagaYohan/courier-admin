import React, { Component } from "react";
import PropTypes from "prop-types";
import { useTheme, Box, Drawer, Stack, useMediaQuery } from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>{/* logo */}</Box>

      <BrowserView>
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh-56px)" : "calc(100vh-88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        />
      </BrowserView>
    </>
  );
};
