import { createSlice, configureStore } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {},
  reducers: {
    changeTheme: (state) => {
      return;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
