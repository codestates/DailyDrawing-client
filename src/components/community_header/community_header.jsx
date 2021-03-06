import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import styles from "./community_header.module.css";

const CommunityHeader = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const onSearchSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchBarWrapper}>
          <IconButton>
            <i className={`fas fa-search ${styles.fa_search}`}></i>
          </IconButton>
          <form>
            <input
              className={styles.search_input}
              placeholder="닉네임이나 태그로 검색해보세요! ex) bee771, 서양화"
              type="text"
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" onClick={onSearchSubmit}></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
