import React, { Component } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

// pages
import { Home, Orders, Users, Login, Types } from "./pages";

// layout
import { Dashboard } from "./layout";

// routes
import Routes from "routes/Routes";

// redux
import store from "./store/store";

import "./styles/global.scss";

const theme = createTheme({
  palette: {
    primary: {
      main: "#57bf82",
    },
  },
});

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/types",
          element: <Types />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={routers} />
        </Provider>
      </ThemeProvider>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          success: {
            duration: 5000,
          },
        }}
      />
    </div>
  );
}

export default App;
