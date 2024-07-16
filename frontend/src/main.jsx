import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home"
import Family from "./pages/Family";
import Login from "./pages/Login";
import Register from "./pages/Registration"
import Admin from "./pages/Admin"
import Profil from "./pages/Profil"


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
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/profil",
          element: <Profil />,
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