import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/Config";
import "./Posts.scss";
import { Tooltip, Avatar, Modal } from "antd";
import { CloseOutlined } from '@ant-design/icons'
import PinterestGrid from "rc-pinterest-grid";
function Posts() {
  const [postHome, setPostHome] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [docPost, setDocPost] = useState({});
  // get posts

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snap) => {
        setPostHome(
          snap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      },
      (error) => {
        console.log("err:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  // reponsive
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //HandleReviewPosts
  const HandleReviewPosts = async (id) => {
    setIsModalOpen(true);
    const getPost = doc(db, "posts", id)
    const docSnap = await getDoc(getPost)
    if (docSnap.exists()) {
      setDocPost(docSnap.data())
      console.log(docPost);
    } else {
      console.log("No such document!");
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="PostsLayout_Pin">
      <PinterestGrid
        columns={
          windowWidth > 1200
            ? 4
            : windowWidth <= 1200 && windowWidth > 900
              ? 3
              : windowWidth <= 900 && windowWidth > 600
                ? 2
                : 1
        } // how many columns in one row
        columnWidth={300} // width of each block
        gutterWidth={12} // horizontal gutter between each block
        gutterHeight={15} // vertical gutter between each block
      >
        {postHome
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <div key={p.id} className="Pin_card" onClick={() => HandleReviewPosts(p.id)}>
              <img src={p.data.imgPost ? p.data.imgPost : null} />
              <div
                className="Pin_card_Introduce"
              >
                <Avatar src={p.data.photoURL}>
                  {p.data.photoURL
                    ? p.data.photoURL
                    : p.data.displayName}
                </Avatar>
                <Tooltip title={p.data.displayName}>
                  <p>{p.data.displayName}</p>
                </Tooltip>
              </div>
              <p className="content">{p.data.valueInputPost}</p>
              <br></br>
            </div>
          ))}
      </PinterestGrid>
      <Modal title={docPost.displayName} open={isModalOpen} closeIcon={<CloseOutlined onClick={handleCancel} />} footer={null}>
        {docPost.imgPost ? <br></br> : ''}
        <img src={docPost.imgPost}  style={{ objectFit: 'cover' }} />
        {docPost.imgPost ? <br></br> : ''}
        <p>{docPost.valueInputPost}</p>
      </Modal>
    </div>
  );
}

export default Posts;
