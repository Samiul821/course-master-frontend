import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="">
      <header>
        <Navbar></Navbar>
      </header>
      <main className={`min-h-[calc(100vh-150px)] xl:px-[15%] lg:px-[6%] md:px-[4%] px-[2%]`}>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default RootLayout;
