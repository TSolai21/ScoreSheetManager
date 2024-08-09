import React from "react";
import styles from "./OverviewContent.module.css";
import Image from "next/image";
const OverviewContent = ({ Image: imageSrc, text, count, i }) => {
  return (
    <>
      <div className={styles.overview}>
        <div className={styles.image}>
          <Image src={imageSrc} alt="image" />
        </div>
        <div className={styles.content}>
          <h3>{count}</h3>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default OverviewContent;
