import React from "react";
import { Typography } from "@mui/material";

const MuiTypography = () => {
  return (
    <div>
      {/* heading */}
      <Typography variant="h1">H1 heading</Typography>
      <Typography variant="h2" gutterBottom>
        H1 heading
      </Typography>
      {/* subtitle */}
      <Typography variant="subtitle1">H1 heading</Typography>
      <Typography variant="subtitle2">H1 heading</Typography>
      {/* body */}
      <Typography variant="body1">H1 heading</Typography>
      <Typography variant="body2">H1 heading</Typography>
    </div>
  );
};

export default MuiTypography;
