import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home"
import Family from "./pages/Family";
import Login from "./pages/Login";



const router = createBrowserRouter([
  {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/family",
          element: <Family />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
);