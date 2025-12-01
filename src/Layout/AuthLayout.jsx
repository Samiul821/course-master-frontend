import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className={`min-h-[calc(100vh-150px)] bg-gray-50`}>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
