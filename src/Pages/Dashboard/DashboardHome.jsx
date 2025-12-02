import React from "react";
import useUserRole from "../../Hooks/useUserRole";
import StudentHome from "./StudentHome/StudentHome";
import AdminHome from "./AdminHome/AdminHome";

const DashboardHome = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <h1>Loading.....</h1>;
  }

  if (role === "student") {
    return <StudentHome />;
  } else if (role === "admin") {
    return <AdminHome />;
  } else {
    return <h1>Forrbidden</h1>;
  }
};

export default DashboardHome;
