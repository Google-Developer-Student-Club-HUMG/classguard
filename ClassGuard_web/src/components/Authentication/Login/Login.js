import React, { useEffect, useRef, useState } from "react";
import './Login.scss';
import { GoogleOutlined, FacebookOutlined, GithubOutlined } from '@ant-design/icons';
// import { auth, db } from "../../Firebase/Config";
import { useUserContext } from "../../../Context/userContext";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

import { Link } from "react-router-dom";
function Login() {
    const [hideShowPassword, setHideShowPassword] = useState(false)
    const {
        signInWithPassword,
        signInWithGoogle,
        signInWithFaceBook,
        signInWithGithub } = useUserContext()
    const emaiSignIn = useRef()
    const passwordSignIn = useRef()
    //signIn
    const signIn = async () => {
        const email = emaiSignIn.current.value.toString();
        const password = passwordSignIn.current.value.toString();
        if (email && password) {
           await signInWithPassword(email, password);
        }
    }
    //togglePassword
    const togglePassword = () => {
        const passwordInput = document.getElementById("password_field");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            setHideShowPassword(true)
        } else {
            passwordInput.type = "password";
            setHideShowPassword(false)
        }
    }
    return (
        <div className="Login">
            <div className="form_container">
                <div className="logo_container">
                    <img alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSOmXbygKF-nLfSqarAFaUQ-Wo_Em-lGnv2hw8rfELiA&s" />
                </div>
                <div className="title_container">
                    <p className="title">Login to your Account</p>
                    <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="email_field">Email</label>
                    <input placeholder="name@mail.com" title="Email" name="input-name" type="text" className="input_field" id="email_field" ref={emaiSignIn} />
                </div>
                <div className="input_container">
                    <label className="input_label" htmlFor="password_field">Password</label>
                    <input placeholder="Password" title="Password" name="input-name" type="password" className="input_field" id="password_field" ref={passwordSignIn} />
                    <div onClick={togglePassword}>{hideShowPassword ? <i className="EyeOutlined"><EyeOutlined /></i> : <i className="EyeOutlined"><EyeInvisibleOutlined /></i>}</div>
                </div>
                <button className="sign-in_btn" onClick={signIn}>
                    <span>Sign In</span>
                </button>

                <div className="separator">
                    <hr className="line" />
                    <span>Or</span>
                    <hr className="line" />
                </div>
                <div className="sign_in">
                    <button title="Sign in with Google" className="sign-in_ggl" onClick={signInWithGoogle}>
                        <span><GoogleOutlined /></span>
                    </button>
                    <button title="Sign in with Facebook" className="sign-in_fbl" onClick={signInWithFaceBook}>
                        <span><FacebookOutlined /></span>
                    </button>
                    <button title="Sign in with Github" className="sign-in_ghl" onClick={signInWithGithub}>
                        <span><GithubOutlined /></span>
                    </button>
                </div>
                <p className="note">Do not have an account? <Link to="/register" className="note_register">Register</Link></p>

            </div>
        </div>
    );
}

export default Login;