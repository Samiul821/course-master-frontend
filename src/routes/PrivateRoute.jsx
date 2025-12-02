import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <h1>Loading......</h1>;
  }

  if (user && user.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
