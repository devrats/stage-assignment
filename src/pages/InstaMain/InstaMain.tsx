import React from "react";
import styles from "./InstaMain.module.css";
import Stories from "../../components/Stories/Stories";

const InstaMain: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mobileContainer}>
        <div className={styles.header}>
          <span className={styles.logo}>Instagram</span>
        </div>
        <Stories />
      </div>
    </div>
  );
};

export default InstaMain;
