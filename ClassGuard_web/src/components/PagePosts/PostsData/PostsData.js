import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/Config";
import NewPosts from "../NewPosts/NewPosts";
function PostsData() {
  // const { user } = useUserContext()
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (snap) => {
        setPosts(
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
  return (
    <>
      <div id="PagePosts_Posts">
        {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <NewPosts key={p.id} posts={p} />
          ))}
      </div>
    </>
  );
}
export default PostsData;
