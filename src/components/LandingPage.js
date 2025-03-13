import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "../styles/LandingPage.module.css";
import { Carousel, Button, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landingPage}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Explore Hong Kong Like Never Before
        </h1>
        <br /> <br />
        <button
          onClick={() => {
            navigate("/tours");
          }}
          className={styles.heroButton}
        >
          Start Your Adventure
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
