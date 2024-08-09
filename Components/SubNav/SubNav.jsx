import React, { useTransition } from "react";
import styles from "./SubNav.module.css";
import { useTranslation } from "react-i18next";
import { datas } from "../../Assets/Datas/Datas";
import { NavLink, useLocation } from "react-router-dom";
import { imagePaths } from "../../ImageSources/ImageSources";
import { useDispatch, useSelector } from "react-redux";
import StudentsSlice from "../../Redux/StudentsSlice";
const SubNav = () => {
  const { t } = useTranslation("lang");

  const navBtns = [
    {
      text: t("List All"),
      to: "listall",
    },
    {
      text: t("List"),
      to: "list ",
    },
    {
      text: t("Add"),
      to: "add",
    },
  ];
  const { pathname } = useLocation();

  const { searchTerm } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(StudentsSlice.actions.setSearchTerm(value));
  };
  return (
    <>
      <div className={styles.subNav}>
        <div className={styles.left}>
          {pathname === "/" ? (
            <h1>{t("API Integration Overview")}</h1>
          ) : (
            <h1>{t("API Integration ")}</h1>
          )}
        </div>
        <div className={styles.right}>
          {pathname === "/listall" ? (
            <div className={styles.search}>
              <img src={imagePaths.searchIcon} alt="Search icon" />
              <input
                value={searchTerm}
                onChange={handleSearch}
                type="text"
                placeholder="Search"
              />
            </div>
          ) : (
            ""
          )}

          <ul>
            {navBtns &&
              navBtns.map(({ text, to }, i) => {
                return (
                  <li key={i}>
                    <NavLink to={to}>{i === 2 ? `+ ${text}` : text}</NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubNav;
