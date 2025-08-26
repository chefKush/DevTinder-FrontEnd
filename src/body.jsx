import React from "react";
import NavBar from "./navBar";
import { Outlet } from "react-router";
import Footer from "./footer";

const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
