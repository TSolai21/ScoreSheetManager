"use client";
import React from "react";
import "@/app/styles/components/_header.scss";
import { MdMenuOpen } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSideBarOpen } from "@/app/Redux/CommonSlice";
import Link from "next/link";

const Header = () => {
  const dispatch = useDispatch();
  const handleSidebar = () => {
    dispatch(setSideBarOpen());
  };

  return (
    <>
      <header>
        <Link href={"/"}>
          <h1>Marksheet</h1>
        </Link>
        <button className="hamburger" onClick={handleSidebar}>
          <MdMenuOpen className="r-btn" />
        </button>
      </header>
    </>
  );
};

export default Header;
