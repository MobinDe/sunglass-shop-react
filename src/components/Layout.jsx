// components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
// import Footer from "./Footer"; // اگر فوتر دارید

const Layout = () => {
  return (
    <div>
      <NavbarComponent />
      <Outlet />
    </div>
  );
};

export default Layout;