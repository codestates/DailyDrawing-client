import React from "react";
import { Link } from "react-router-dom";
import styles from "./enter_first.module.css";
import Fade from "react-reveal/Fade";

const EnterFirst = ({ scrollToCourse, scrollPossible }) => {
  return (
    <div className={`${styles.home} ${styles.section}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.content}`}>
          <div className={`${styles.social}`}></div>
          <Fade top duration={1800} delay={200} distance={"30px"}>
            <img
              className={`${styles.img}`}
              src="/images/western1.jpeg"
              alt="western1"
            />
          </Fade>

          <Fade top cascade duration={1800} distance={"30px"}>
            <div className={`${styles.data}`}>
              <h1 className={`${styles.title}`}>DailyDrawing</h1>
              <h3 className={`${styles.subtitle}`}>
                예술가, 화가 되고싶으신가요?
              </h3>
              <p className={`${styles.description}`}>
                DailyDrawing과 함께 꿈을 이루어 보세요.
              </p>
              <div className={`${styles.button_wrapper} `}>
                <Link
                  to="/community"
                  className={`${styles.button} ${styles.button_flex}`}
                >
                  둘러보기
                </Link>
              </div>
            </div>
          </Fade>
        </div>

        <Fade top duration={1800} delay={200} distance={"30px"}>
          <div
            className={
              scrollPossible
                ? `${styles.scroll}`
                : `${styles.scroll} ${styles.noscroll}`
            }
          >
            <div
              className={`${styles.scroll_button} ${styles.button_flex}`}
              onClick={scrollToCourse}
            >
              <span className={`${styles.scroll_name}`}>대표작 보기</span>
              <i className={`uil uil-arrow-down ${styles.scroll_arrow}`}></i>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default EnterFirst;
