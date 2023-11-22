import React, { useState, useEffect, memo } from "react";
import "./ModalPost.scss";
import { Modal, Spin } from "antd";
import { useUserContext } from "../../../Context/userContext";
import uploadImg from "../../Share/Img/photo.png";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { storage, db } from "../../../Firebase/Config";
import EmojiPicker from "emoji-picker-react";
import emojiPicker from "../../Share/Img/emojiIcon.png";

function ModalPost() {
  const { user } = useUserContext();
  const [showEmojis, setShowEmojis] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalOpenThinking, setIsModalOpenThinking] = useState(false);
  const [valueInputPost, setValueInputPost] = useState("");
  const [imgPost, setImgPost] = useState(null);
  //emoji
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setValueInputPost(valueInputPost + emoji);
  };
  // handleImagePostsChange
  const handleImagePostsChange = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImgPost(file);
  };
  //clear img
  useEffect(() => {
    return () => {
      imgPost && URL.revokeObjectURL(imgPost);
    };
  }, [imgPost]);
  //post
  const handlePost = async () => {
    if (imgPost) {
      setLoadingModal(true);
      const storageRef = ref(storage, "Posts/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, imgPost);
      uploadTask.on(
        (error) => { 
          console.error("Error during upload:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "posts"), {
              uid: user.uid,
              photoURL: user.photoURL,
              displayName: user.displayName,
              valueInputPost,
              imgPost: downloadURL,
              timestamp: serverTimestamp(),
            });

            await updateDoc(doc(db, "usersPosts", user.uid), {
              messages: arrayUnion({
                id: uuid(),
                uid: user.uid,
                photoURL: user.photoURL,
                displayName: user.displayName,
                valueInputPost,
                imgPost: downloadURL,
                timestamp: Timestamp.now(),
              }),
            });
          });
        }
      );
    } else {
      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        valueInputPost,
        timestamp: serverTimestamp(),
      });

      await updateDoc(doc(db, "usersPosts", user.uid), {
        messages: arrayUnion({
          id: uuid(),
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          valueInputPost,
          timestamp: Timestamp.now(),
        }),
      });
    }
    setValueInputPost("");
    setImgPost(null);
    setIsModalOpenThinking(false);
    setShowEmojis(false);
    setLoadingModal(false);
  };
  //removeImage
  const removeImage = () => {
    setImgPost(null);
  };
  // isModalOpenThinking
  const showModal = () => {
    setIsModalOpenThinking(true);
  };
  const handleOk = () => {
    handlePost();
  };
  const handleCancel = () => {
    setIsModalOpenThinking(false);
    setValueInputPost("");
    setImgPost(null);
    setShowEmojis(false);
  };
  return (
    <div div className="ModalPost">
      <form action="" className="create-post">
        <div className="title-post" style={{ marginLeft: "15px" }}>
          <p
            style={{
              userSelect: "none",
              fontSize: "14px",
              marginBottom: "10px",
            }}
          >
            What are you thinking,{" "}
            <span style={{ fontWeight: "600" }}>{user.displayName}</span>?
          </p>
        </div>
        <div className="input-form">
          <input
            type="text"
            placeholder="What's on your mind?"
            id="create-post_input"
            onClick={showModal}
          />
        </div>
      </form>
      <div className="showModal">
        <Modal
          className="show-form"
          width={650}
          open={isModalOpenThinking}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          okText="Post"
        >
          <p className="title-form-post">
            <b> {user.displayName}</b>, write your thoughts...
          </p>
          <p>(If you don't see your name, please reload the page)</p>
          <br></br>
          <div className="content-form-post">
            <label htmlFor=""><p>Title post</p></label>
            <input
              value={valueInputPost}
              onChange={(e) => setValueInputPost(e.target.value)}
              type="text"
              className="input-title"
              placeholder="write here..."
              required
            />
            {imgPost && (
              <div className="shareImgContainer">
                <img
                  src={imgPost ? imgPost.preview : null}
                  alt=""
                  className="shareImg"
                />
              </div>
            )}
          </div>
          <div className="shareContainer">
            <div className="select_control_Post">
              <label
                htmlFor="filePost"
                style={{ display: "flex", alignItems: "center" }}
              >
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg"
                  name="filePost"
                  id="filePost"
                  style={{ display: "none" }}
                  onChange={handleImagePostsChange}
                />
                {imgPost ? (
                  <button
                    className="button_select_control_Post"
                    onClick={removeImage}
                  >
                    remove photo
                  </button>
                ) : (
                  ""
                )}
                <img
                  alt="No"
                  src={uploadImg}
                  style={{ width: "50px", height: "50px", cursor: "pointer" }}
                />
              </label>
            </div>

            <div className="select_emoji_Post">
              <img
                alt="No"
                src={emojiPicker}
                onClick={() => setShowEmojis(!showEmojis)}
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              />
              {showEmojis && (
                <div className="emoji_Post">
                  <EmojiPicker onEmojiClick={addEmoji} emojiStyle="native" />
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
      {loadingModal && (
        <Spin
          size="large"
          style={{
            position: "absolute",
            zIndex: 1000000,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </div>
  );
}

export default memo(ModalPost);
