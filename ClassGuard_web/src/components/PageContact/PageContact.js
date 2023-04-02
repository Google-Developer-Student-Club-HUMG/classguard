import React from "react";
import './PageContact.scss';
import NavBar from "../Share/NavBar/NavBar";
import Introduce from "./Introduce/Introduce";
import Footer from "../PageHome/Footer/Footer";
function PageContact() {
    return (
        <div className="PageContact">
            <NavBar />
            <Introduce />
            <Footer />
        </div>
    );
}

export default PageContact;