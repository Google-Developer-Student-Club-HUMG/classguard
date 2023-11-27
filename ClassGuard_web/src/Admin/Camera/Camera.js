import React from "react";
import "./Camera.scss";
// import { UilEstate } from "@iconscout/react-unicons";
// import { Link } from "react-router-dom";
import NavChildAdmin from "../NavChildAdmin/NavChildAdmin";
import videoCam1 from './videoCamera/2845173717706552356.mp4'
import videoCam2 from './videoCamera/3723935333074705340.mp4'
import videoCam3 from './videoCamera/6982717536944840013.mp4'
import videoCam4 from './videoCamera/video1.mp4'
function Camera() {
  return (
    <div>
      <NavChildAdmin />
      <h1 style={{ marginTop: "50px", fontWeight: "bold" }}>Camera Admin</h1>
      <div className="flex center">
        <div className="boxVideo">
          <div className="title">Camera 1</div>
          <video width="500" src={videoCam1} controls autoplay loop={true} muted>
            Your browser does not support HTML video.
          </video>
        </div>
        <div className="boxVideo">
          <div className="title">Camera 2</div>
          <video width="500" src={videoCam2} controls autoplay loop={true} muted>
            Your browser does not support HTML video.
          </video>
        </div>
      </div>
      <div className="flex center">
        <div className="boxVideo">
          <div className="title">Camera 3</div>
          <video width="500" src={videoCam3} controls autoplay loop={true} muted>
            Your browser does not support HTML video.
          </video>
        </div>
        <div className="boxVideo">
          <div className="title">Camera 4</div>
          <video width="500" src={videoCam4} controls autoplay loop={true} muted>
            Your browser does not support HTML video.
          </video>
        </div>
      </div>
    </div>
  );
}

export default Camera;
