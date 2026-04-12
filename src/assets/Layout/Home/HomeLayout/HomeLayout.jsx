import React from "react";
import Navber from "../../../Navber/Navber";
import { Outlet } from "react-router";
import Footer from "../../../Fotter/Footer";

const HomeLayout = () => {
  return (
    <div className="border-2 ">
      <div className="sticky z-50">
        <Navber></Navber>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
