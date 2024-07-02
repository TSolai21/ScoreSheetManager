import React from "react";
import styles from "./Header.module.css";
import { imagePaths } from "../../ImageSources/ImageSources";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <NavLink to={"/"}>
              <img src={imagePaths.logo} alt="logo" />
            </NavLink>
          </div>
          <div className={styles.hamburger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Button>
            <span>Nick Jones</span>
            <img src={imagePaths.user} alt="user" />
            <img src={imagePaths.down} alt="dropdown" />
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
