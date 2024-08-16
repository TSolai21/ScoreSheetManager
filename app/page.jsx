"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { imagePaths } from "@/ImageSources/ImageSources";
import "@/app/styles/_overview.scss";
import Button from "@/Components/Button/Button";
import OverviewContent from "@/Components/OverviewContent/OverviewContent";
import OverviewChart from "@/Components/OverviewChart/OverviewChart";
import { fetchStudents } from "./Redux/StudentsSlice";
import Image from "next/image";
import { color } from "highcharts";

export default function Home({ children }) {
  const { t } = useTranslation("lang");
  const { data } = useSelector((state) => state.students);

  const [overviewsData, setOverviewsData] = useState(data);

  const [selectFilter, setSelectFilter] = useState("all");
  useEffect(() => {
    if (selectFilter === "all") {
      setOverviewsData(data);
    } else {
      setOverviewsData(
        data.filter(
          (data) => data.gender.toLowerCase() === selectFilter.toLowerCase()
        )
      );
    }
  }, [data, selectFilter]);

  const [gradeOverviewArray, setGradeOverviewArray] = useState([]);

  useEffect(() => {
    const filtered = overviews.map((datas) => {
      return overviewsData.filter(
        (data) => data.grade?.toLowerCase() === datas.text.toLowerCase()
      ).length;
    });

    setGradeOverviewArray(filtered);
  }, [overviewsData, data]);

  const overviews = [
    {
      Image: imagePaths.excellent,
      text: t("Excellent"),
    },
    {
      Image: imagePaths.verygood,
      text: t("Very Good"),
    },
    {
      Image: imagePaths.good,
      text: t("Good"),
    },
    {
      Image: imagePaths.ok,
      text: t("Ok"),
    },
    {
      Image: imagePaths.fail,
      text: t("Fair & Fail"),
    },
  ];

  const [filterOpen, setFilterOPen] = useState(false);
  const handleFilterOpen = () => {
    setFilterOPen((prev) => !prev);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const handleFilterChage = (value) => {
    setSelectFilter(value.toLowerCase());
    setFilterOPen(false);
  };

  const colors = ["#60B72B", "#E8C11F", "#822FE0", "black", "#EA0E0E"];

  return (
    <>
      <div className={"overviews"}>
        <div className={"gradeOverview"}>
          <div className={"head"}>
            <h2>
              {t("Grade Overview")} -{" "}
              <span>{t(`${selectFilter.toUpperCase()}`)}</span>
            </h2>
            <div className={"filter"}>
              <Button call={handleFilterOpen}>
                <span>
                  <Image src={imagePaths.filter} alt="filter" />
                </span>
                <span>{t(`${selectFilter.toUpperCase()}`)}</span>
                <span className={filterOpen ? "active" : ""}>
                  <Image src={imagePaths.dropdown} alt="dropdown" />
                </span>
              </Button>
              {filterOpen && (
                <ul>
                  <li onClick={() => handleFilterChage("All")}>{t("All")} </li>
                  <li onClick={() => handleFilterChage("Male")}>
                    {t("Male")}{" "}
                  </li>
                  <li onClick={() => handleFilterChage("Female")}>
                    {t("Female")}{" "}
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className={"body"}>
            {overviews &&
              overviews.map(({ Image, text, count }, i) => {
                return (
                  <OverviewContent
                    Image={Image}
                    key={i}
                    text={text}
                    count={gradeOverviewArray[i]}
                    i={i}
                    color={colors[i]}
                  />
                );
              })}
          </div>
        </div>
        <div className={"chartOverview"}>
          <div className={"head"}>
            <h2>{t("Chart Overview")}</h2>
            <OverviewChart selectValue={"All"} chartData={gradeOverviewArray} />
          </div>
        </div>
      </div>
    </>
  );
}
