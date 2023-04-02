import React, { useEffect, useRef, useState } from "react";
import "./NewPosts.scss";
import { Avatar, Col, Row, Spin } from "antd";
import {
  CommentOutlined,
  SmileOutlined,
  SendOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import ImgLike from "../../Share/Img/like.png";
import Imgdislike from "../../Share/Img/dislike.png";
import likeBlue from "../../Share/Img/likeblue.png";
import likeOutLine from "../../Share/Img/likeoutline.png";
import dislikeRed from "../../Share/Img/dislikeRed.png";
import dislikeBlack from "../../Share/Img/dislikeBlack.png";
import {
  deleteDoc,
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../Firebase/Config";
import EmojiPicker from "emoji-picker-react";
import TimeAgo from "react-timeago";
import { useUserContext } from "../../../Context/userContext";
function NewPosts({ posts }) {
  const { user } = useUserContext();
  const inputNewPostRef = useRef();
  const [loadingSpin, setLoadingSpin] = useState(false);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [dislikes, setDislikes] = useState([]);
  const [disliked, setDisliked] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentPost, setCommentPost] = useState([]);
  const [showEmojisNewPost, setShowEmojisNewPost] = useState(false);
  const [openControlPost, setOpenControlPost] = useState(false);
  // /likePost
  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", posts.id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return () => {
      unSub();
    };
  }, [posts.id]);
  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likes, user.uid]);
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", posts.id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", posts.id, "likes", user.uid), {
        userId: user.uid,
      });
    }
  };
  //dislikes
  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", posts.id, "dislikes"),
      (snapshot) => {
        setDislikes(snapshot.docs);
      }
    );
    return () => {
      unSub();
    };
  }, [posts.id]);
  useEffect(() => {
    setDisliked(
      dislikes.findIndex((dislike) => dislike.id === user?.uid) !== -1
    );
  }, [dislikes, user.uid]);
  const disLikePost = async () => {
    if (disliked) {
      await deleteDoc(doc(db, "posts", posts.id, "dislikes", user.uid));
    } else {
      await setDoc(doc(db, "posts", posts.id, "dislikes", user.uid), {
        userId: user.uid,
      });
    }
  };

  ///////////////////////////Comment///////////////////////////
  //add emoji
  const addEmojiComment = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    inputNewPostRef.current.value = inputNewPostRef.current.value + emoji;
  };
  /////handleComment////
  // enter seen comment
  const keyDownEnter = async (event) => {
    if (event.code === "Enter" && inputNewPostRef.current.value !== "") {
      setLoadingSpin(true);
      await addDoc(collection(db, "posts", posts.id, "comments"), {
        comment: inputNewPostRef.current.value,
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setLoadingSpin(false);
      inputNewPostRef.current.value = "";
      setShowEmojisNewPost(false);
    }
  };
  //click seen comment
  const handleComment = async (e) => {
    if (inputNewPostRef.current.value === "") return;
    setLoadingSpin(true);
    await addDoc(collection(db, "posts", posts.id, "comments"), {
      comment: inputNewPostRef.current.value,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      timestamp: serverTimestamp(),
    });
    setLoadingSpin(false);
    inputNewPostRef.current.value = "";
    setShowEmojisNewPost(false);
  };
  //// listen to change push comment////
  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", posts.id, "comments"),
      (snapshot) => {
        setCommentPost(
          snapshot.docs.map((data) => ({
            id: data.id,
            data: data.data(),
          }))
        );
      }
    );
    return () => {
      unSub();
    };
  }, [posts.id]);
  //handleOpenControl
  const handleOpenControl = () => {
    setOpenControlPost(!openControlPost);
  };
  //handleDeletePost
  const handleDeletePost = async () => {
    deleteDoc(doc(db, "usersPosts", posts.id));
    await deleteDoc(doc(db, "posts", posts.id));
  };
  return (
    <div id="NewPosts">
      <div className="NewPosts">
        <div id="header_NewPosts">
          <Row className="header_NewPosts">
            <Avatar alt="post" src={posts.data.photoURL ? posts.data.photoURL : null}>
              {posts.data.photoURL
                ? posts.data.photoURL
                : posts.data.displayName?.charAt(0).toUpperCase()}
            </Avatar>
            <Col className="NameUserNewPosts_TimeNewPosts">
              <p className="NameUserNewPosts">{posts.data.displayName}</p>
              <p className="TimeNewPosts">
                <TimeAgo date={posts.data?.timestamp?.toDate()} />
              </p>
            </Col>
          </Row>
          {posts.data.uid === user.uid ? (
            <div className="View_NewPosts" onClick={handleOpenControl}>
              <MoreOutlined className="View_NewPosts_MoreOutlined" />
              {openControlPost && (
                <div className="openControlPost">
                  <ul>
                    <p onClick={handleDeletePost}>Delete</p>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="articleTitle_NewPosts">
          <p>{posts.data.valueInputPost}</p>
        </div>
        <div className="div_Img_NewPosts">
          <img className="Img_NewPosts" src={posts.data.imgPost} />
        </div>
        <div className="Seen_Like_NewPosts">
          <span className="Like_NewPosts">
            <img className="img_Like_NewPosts" alt="post" src={ImgLike} />
            <p>
              {likes.length > 0 ? (
                <span className="postLikeCounter">{likes.length}</span>
              ) : (
                "0"
              )}
            </p>
          </span>
          <span className="Like_NewPosts">
            <p>
              {commentPost.length > 0 ? (
                <span className="postLikeCounter">{commentPost.length}</span>
              ) : (
                "0"
              )}
            </p>
            <p style={{ margin: "0" }}>Comment</p>
          </span>

          <span className="Count_dislike">
            <p>
              {dislikes.length > 0 ? (
                <span className="postDisLikeCounter">{dislikes.length}</span>
              ) : (
                "0"
              )}
            </p>
            <img className="img_DisLike_NewPosts" alt="post" src={Imgdislike} />
          </span>
        </div>
        <div className="handle_emoticon_NewPosts">
          <button className="handle_Like_NewPosts" onClick={likePost}>
            {liked ? (
              <img
                alt="post" src={likeBlue}
                className="likeBlue"
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              <img alt="post" src={likeOutLine} className="likeOutLine" />
            )}
            {liked ? (
              <span style={{ color: "#284F8F" }}>Like</span>
            ) : (
              <span style={{ color: "#000" }}>Like</span>
            )}
          </button>
          <button
            className="handle_Comment_NewPosts"
            onClick={(e) => {
              setComment(!comment);
              setCommentOpen(!commentOpen);
            }}
          >
            <CommentOutlined className="icon_Comment_NewPosts" />
            <span>Comment</span>
          </button>
          <button className="handle_Dislike_NewPosts" onClick={disLikePost}>
            {disliked ? (
              <img
                alt="post" src={dislikeRed}
                className="likeBlue"
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              <img alt="post" src={dislikeBlack} className="likeOutLine" />
            )}
            {disliked ? (
              <span style={{ color: "#C7372F" }}>Dislike</span>
            ) : (
              <span style={{ color: "#000" }}>Dislike</span>
            )}
          </button>
        </div>

        {comment && (
          <>
            <div className="input_comment">
              {loadingSpin && (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              )}
              <input
                ref={inputNewPostRef}
                onKeyDown={keyDownEnter}
                className="input_comment_post"
                id="input_comment_post"
                placeholder="Comment..."
                type="text"
                required
              />
              <span>
                <SmileOutlined
                  className="SmileOutlined"
                  onClick={(e) => {
                    setShowEmojisNewPost(!showEmojisNewPost);
                  }}
                />
              </span>
              <span>
                <SendOutlined
                  className="SendOutlined"
                  onClick={handleComment}
                />
              </span>
            </div>
            <div
              className={
                showEmojisNewPost ? "emoji_NewPost" : "emoji_NewPost_none"
              }
            >
              <EmojiPicker
                width="100%"
                className="EmojiPicker_NewPost"
                onEmojiClick={addEmojiComment}
                emojiStyle="native"
                previewConfig={false}
              />
            </div>
          </>
        )}
        {commentOpen > 0 && (
          <div className="commentWrapper_post">
            {commentPost
              .map((cm) => (
                <div key={cm.uid} className="comments_Post_user">
                  <div className="commentWrapper">
                    <Avatar alt="post" src={cm.data.photoURL}>
                      {cm.data.photoURL
                        ? ""
                        : cm.data.displayName?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="commentInfo">
                      <span className="commentUserName">
                        {cm.data.displayName}
                      </span>
                      <p className="commentText">{cm.data.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default NewPosts;
