import React, { Component } from "react";
import { Box, Stack } from "@mui/material";

const MuiLayout = () => {
  return (
    <Box
      // component="span"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        height: "100px",
        width: "100px",
        padding: "16px",
        "&:hover": {
          backgroundColor: "primary-light",
        },
      }}
    >
      Box component
    </Box>
  );
};

export default MuiLayout;
