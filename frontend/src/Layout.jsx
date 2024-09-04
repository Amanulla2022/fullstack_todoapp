import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useSelector((store) => store.auth);

  return isLoggedIn ? element : <Navigate to="/login" />;
};

const Layout = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<Home />} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Layout;
