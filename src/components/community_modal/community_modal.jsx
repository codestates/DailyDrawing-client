import React, { useRef, useEffect, useCallback, useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./community_modal.module.css";
import Fade from "react-reveal/Fade";
import axios from "axios";
import { useSelector } from "react-redux";

const URL = process.env.REACT_APP_SERVER_URL;
export const CommunityModal = ({
  showModal,
  setShowModal,
  modalInfo,
  postComments,
  postUserInfo,
  likeCountNum,
}) => {
  const userInfo = useSelector(state => state.userReducer.user);
  const { accessToken } = userInfo;
  const [toggleReply, setToggleReply] = useState(true);
  const [toggleLike, setToggleLike] = useState(false);
  const [typeInfo, setTypeInfo] = useState(null);
  const inputRef = useRef();
  const backRef = useRef();

  const animation = useSpring({
    config: {
      duration: 300,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(6%)` : `translateY(-100%)`,
  });

  const closeModal = e => {
    if (backRef.current === e.target) {
      setShowModal(false);
    }
  };
  const handleToggleReply = () => {
    setToggleReply(pre => !pre);
  };
  const handleToggleLike = () => {
    setToggleLike(pre => !pre);
  };

  const keyPress = useCallback(
    e => {
      if (showModal && e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  const handleBtnComment = async () => {
    if (inputRef.current.value !== "" && inputRef.current.value !== null) {
      try {
        const obj = {
          Drawings_id: modalInfo.id,
          comment: inputRef.current.value,
        };
        await axios.post(`${URL}/comments/upload`, obj, {
          headers: { authorization: `Bearer ${accessToken}` },
        });
        postComments.push({
          nickname: userInfo.nickname,
          comment: inputRef.current.value,
        });
        inputRef.current.value = "";
        setTypeInfo(obj.comment);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleBtnLike = () => {};

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal && postUserInfo ? (
        <div className={styles.back} onClick={closeModal} ref={backRef}>
          <div
            className={
              toggleReply
                ? `${styles.container}`
                : `${styles.container} ${styles.active}`
            }
          >
            <div
              className={styles.close}
              onClick={() => {
                setShowModal(pre => !pre);
              }}
            >
              <i className={`fas fa-times ${styles.icon_close}`}></i>
            </div>
            <div
              className={
                toggleReply
                  ? `${styles.postAndComment}`
                  : `${styles.postAndComment} ${styles.active}`
              }
            >
              <div className={styles.post}>
                <div className={styles.post_userInfo}>
                  <img
                    className={styles.userInfo_img}
                    src={`${URL}/profile/get/${postUserInfo.profileImg}`}
                  />
                  <span className={styles.userInfo_nickname}>
                    {postUserInfo.nickname}
                  </span>
                </div>
                <div className={styles.post_postInfo}>
                  <div className={styles.post_title}>{modalInfo.title}</div>
                  <img
                    className={styles.postImg}
                    src={`${URL}/image/get/${modalInfo.DrawingImg}`}
                  />
                </div>
                <div className={styles.icons}>
                  <i
                    className={
                      toggleLike
                        ? `fas fa-heart ${styles.icon_like}`
                        : `far fa-heart ${styles.icon_like}`
                    }
                    onClick={handleToggleLike}
                  ></i>

                  <span className={styles.likeCount}>{likeCountNum}</span>
                  <i
                    className={
                      toggleReply
                        ? `fas fa-comment-dots ${styles.icon_reply}`
                        : `far fa-comment-dots ${styles.icon_reply}`
                    }
                    onClick={handleToggleReply}
                  ></i>
                  <i></i>
                </div>
              </div>

              <div
                className={
                  toggleReply
                    ? `${styles.comments}`
                    : `${styles.comments} ${styles.active}`
                }
              >
                {postComments.length > 0 ? (
                  <ul className={styles.showComments}>
                    {postComments.map(comment => (
                      <li className={styles.comment}>
                        <span className={styles.comment_nickname}>
                          {comment.nickname}
                        </span>
                        <span className={styles.comment_colon}>:</span>
                        <span className={styles.comment_content}>
                          {comment.comment}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>아직 등록된 댓글이 없습니다.</div>
                )}
                {accessToken ? (
                  <div className={styles.comment_upload}>
                    <i class="far fa-comments" onClick={handleBtnComment}></i>
                    <input
                      placeholder="댓글을 입력해주세요."
                      type="text"
                      className={styles.comment_input}
                      ref={inputRef}
                      onKeyPress={event => {
                        if (event.key === "Enter") {
                          handleBtnComment();
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className={styles.msg}>
                    댓글을 달기 위해 로그인이 필요합니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
