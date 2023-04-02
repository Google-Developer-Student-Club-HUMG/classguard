import React from "react";
import './Footer.scss'
import { FacebookFilled, GithubOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons'
function Footer() {
    return (
        <div className="body_footer">
            <footer className="footer">
                <div className="waves">
                    <div className="wave" id="wave1"></div>
                    <div className="wave" id="wave2"></div>
                    <div className="wave" id="wave3"></div>
                    <div className="wave" id="wave4"></div>
                </div>
                <ul className="social-icon">
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-facebook"><FacebookFilled /></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-twitter"><GithubOutlined /></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-instagram"><LinkedinOutlined /></ion-icon>
                    </a></li>
                    <li className="social-icon__item"><a className="social-icon__link" href="#">
                        <ion-icon name="logo-instagram"><InstagramOutlined /></ion-icon>
                    </a></li>
                </ul>
                <ul className="menu">
                    <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Posts</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Camera</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
                    <li className="menu__item"><a className="menu__link" href="#">Team</a></li>

                </ul>
                <p className="copyRight">&copy; 2023 GDSC HUMG | Solution Challenge</p>
            </footer>
        </div>
    );
}

export default Footer;