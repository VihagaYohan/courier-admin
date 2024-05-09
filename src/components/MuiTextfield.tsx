import React, { Component, useState } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";

const MuiTextfield = (props) => {
  const [value, setValue] = useState<String>("");

  return (
    <Stack spacing={4}>
      <Stack spacing={2} direction="row">
        <TextField label="name" variant="outlined" />
        <TextField label="name" variant="filled" />
        <TextField label="name" variant="standard" />
      </Stack>

      {/* size & color */}
      <Stack spacing={2} direction="row">
        <TextField label="small secondary" size="small" color="secondary" />
      </Stack>

      {/* forms */}
      <Stack spacing={2} direction="row">
        <TextField label="small secondary" required />
        <TextField
          label="small secondary"
          helperText="Do not share your password"
        />
        <TextField
          label="password"
          type="password"
          helperText="Do not share your password"
        />
        <TextField label="password" disabled />
        <TextField label="password" inputProps={{ readOnly: true }} />
      </Stack>

      <Stack spacing={2}>
        <TextField
          label="amount"
          inputProps={{
            startAdorment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="weight"
          inputProps={{
            endAdorment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
        />
      </Stack>

      {/* error */}
      <Stack spacing={2}>
        <TextField
          label="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          error={!value}
          helperText={!value ? "Required" : "Enter your email"}
        />
      </Stack>
    </Stack>
  );
};

export default MuiTextfield;
