import React from "react";
import styles from "./OverviewContent.module.css";
import Image from "next/image";
const OverviewContent = ({ Image: imageSrc, text, count, i, color }) => {
  return (
    <>
      <div className={styles.overview} style={{ backgroundColor: color }}>
        {/* <div className={styles.image}> */}
        {/* <Image src={imageSrc} alt="image" /> */}
        {/* <div className="color-ball"></div> */}
        {/* </div> */}
        <div className={styles.content}>
          <h3 style={{ color: i == 3 ? "white" : "" }}>{count}</h3>
          <p style={{ color: i == 3 ? "white" : "" }}> {text}</p>
        </div>
      </div>
    </>
  );
};

export default OverviewContent;
