import React, { Component } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

// pages
import { Home, Orders, Users, Login } from "./pages";

// layout
import { Dashboard } from "./layout";

// routes
import Routes from "routes/Routes";

import "./styles/global.scss";

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

  return <RouterProvider router={routers} />;
}

export default App;
