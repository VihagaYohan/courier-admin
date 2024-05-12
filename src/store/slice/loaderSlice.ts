import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface loaderState {
  loadingState: boolean;
}

const initialState: loaderState = {
  loadingState: false,
};

const loaderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingState = true;
    },
    stopLoading: (state) => {
      state.loadingState = false;
    },
  },
});

export const { startLoading, stopLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
