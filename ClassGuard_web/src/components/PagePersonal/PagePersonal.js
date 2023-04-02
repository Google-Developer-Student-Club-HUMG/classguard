import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/Config";
import NavBar from "../Share/NavBar/NavBar";
import NewPosts from "../PagePosts/NewPosts/NewPosts";
import { useUserContext } from "../../Context/userContext";
import Item from "antd/es/list/Item";
function PagePersonal() {
    // const { user } = useUserContext();
    // const [postPersonal, setPostPersonal] = useState([])
    // useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //         collection(db, "usersPosts"),
    //         (snap) => {
    //             setPostPersonal(
    //                 snap.docs.map((doc) => (
    //                     {
    //                         id: doc.id,
    //                         data: doc.data().messages
    //                     }
    //                 )).filter((item) => item.id === user.uid)[0].data.map((data)=>({
    //                     id: data.uid,
    //                     data: data
    //                 }))
    //             );
    //         },
    //         (error) => {
    //             console.log("err:", error);
    //         }
    //     );

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [user.uid]);
    // console.log(postPersonal);
    return (
        <div className="PagePersonal">
            <NavBar />
         <h2 style={{textAlign:"center"}}>we are developing it</h2>
            {/* {postPersonal
                .map((p) => (
                    <NewPosts key={p.id} posts={p} />
                ))} */}
        </div>
    );
}

export default PagePersonal;