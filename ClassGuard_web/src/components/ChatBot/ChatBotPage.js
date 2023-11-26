import React from "react";
import NavBar from "../Share/NavBar/NavBar";
import Chatbot from "./ChatBot";
import Footer from "../PageHome/Footer/Footer";
function ChatBotPage() {
    return (
        <div className="PageContact">
            <NavBar />
            <Chatbot/>
            <Footer />
        </div>
    );
}

export default ChatBotPage;