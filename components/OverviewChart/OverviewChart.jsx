import React from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
const OverviewChart = ({ selectValue, chartData }) => {
  const { t } = useTranslation("lang");
  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: null,
      width: null,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        t("Excellent"),
        t("Very good"),
        t("Good"),
        t("Ok"),
        t("Fail"),
      ],
      labels: {
        style: {
          color: "gray",
          fontSize: "var(--fs17)",
        },
      },
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    yAxis: {
      title: "",
      tickPixelInterval: 50,
      labels: {
        style: {
          color: "gray",
          fontSize: "var(--fs17)",
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: selectValue,
        data: chartData,
        colorByPoint: true,
        colors: ["#60B72B", "#E8C11F", "#822FE0", "black", "#EA0E0E"],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
export default OverviewChart;
