import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from './contexts/AuthContext';
import App from "./App";
import Home from "./pages/Home"
import Family from "./pages/Family";
import Login from "./pages/Login";
import Register from "./pages/Registration"
import Admin from "./pages/admin/Admin.jsx"
import Profile from "./pages/Profile.jsx"
import PrivateRoute from './components/PrivateRoute.jsx';
import FamilyDetails from './components/FamilyDetails.jsx';
import FamiliesCards from './components/FamiliesCards.jsx';


const router = createBrowserRouter([
  {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        // Routes protégées par authentification
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              path: "/admin",
              element: <Admin />,
              children: [
                {
                  path: "families",
                  element: <FamiliesCards /> // Affichage par défaut de toutes les familles (CardTemplates)
                },
                {
                  path: "families/:userId",
                  element: <FamilyDetails /> // Affiche les détails d'une famille
                }
              ]
            },
            {
              path: "/family",
              element: <Family />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
          ]
        }
      ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
</React.StrictMode>
);
