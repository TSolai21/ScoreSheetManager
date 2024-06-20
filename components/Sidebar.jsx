"use client";
import React from "react";
import "@/app/styles/_sidebar.scss";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.common.sidebarOpen);

  return (
    <>
      <div className={`sidebar ${!sidebarOpen ? "active" : ""}`}>
        <div className="wrapper">
          <div className="logo">
            <h1>Marksheet</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
