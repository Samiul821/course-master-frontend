import React from "react";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import { Navigate } from "react-router";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <h1>Loading......</h1>;
  }

  if (!user || role !== "student") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default StudentRoute;
