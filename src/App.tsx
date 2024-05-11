import React, { Component } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

// pages
import { Home, Orders, Users } from "./pages";

// routes
import Routes from "routes/Routes";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: Routes.orders,
      element: <Orders />,
    },
    {
      path: Routes.users,
      element: <Users />,
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
