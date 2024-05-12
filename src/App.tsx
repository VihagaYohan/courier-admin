import React, { Component } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";

// pages
import { Home, Orders, Users, Login } from "./pages";

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
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={routers} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
