import React from "react";
import NavBar from "../Share/NavBar/NavBar";
import SlideBanner from './SlideBanner/SlideBanner'
import ModalPost from '../PagePosts/ModalPost/ModalPost'
import PostHeader from './PostHeader/PostHeader';
import PostsData from "../PagePosts/PostsData/PostsData";
import Footer from './Footer/Footer';
import Posts from "./Posts/Posts";
function PageHome() {
    return (
        <>
            <NavBar />
            {/* <SlideBanner/> */}
            {/* <ModalPost/> */}
            <PostHeader />
            <Posts />
            <Footer />
        </>
    );
}

export default PageHome;