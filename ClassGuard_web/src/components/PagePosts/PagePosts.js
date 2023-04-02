import React from "react";
import './PagePosts.scss';
import NavBar from "../Share/NavBar/NavBar";
import ModalPost from "./ModalPost/ModalPost";
import PostsData from "./PostsData/PostsData";
import Footer from "../PageHome/Footer/Footer";
function PagePosts() {

    return (
        <div className="PagePosts">
            <NavBar />
            <ModalPost />
            <PostsData />
            <Footer />
        </div>
    );
}

export default PagePosts;