"use client";
import React, { useEffect, useState } from "react";
import "@/app/styles/components/_sidebar.scss";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.common.sidebarOpen);
  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/listall", label: "All Students" },
    { href: "/list", label: "Student" },
    { href: "/add", label: "New Student" },
  ];
  const pathname = usePathname();

  return (
    <>
      <div className={`sidebar ${!sidebarOpen ? "active" : ""}`}>
        <div className="wrapper">
          <div className="logo">
            <Link href={"/"}>
              <h1>Marksheet</h1>
            </Link>
          </div>
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={pathname == link.href ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
