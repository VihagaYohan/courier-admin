import React, { Component } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

// pages
import { Home, Orders, Users } from "./pages";

// layout
import { Dashboard } from "./layout";

// routes
import Routes from "routes/Routes";

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
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
