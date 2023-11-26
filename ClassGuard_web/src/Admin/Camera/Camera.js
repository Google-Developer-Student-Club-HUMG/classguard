import React from "react";
import "./Camera.scss";
// import { UilEstate } from "@iconscout/react-unicons";
// import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import NavChildAdmin from "../NavChildAdmin/NavChildAdmin";
function Camera() {
  return (
    <div>
      <NavChildAdmin />
      <h1 style={{ marginTop: "50px", fontWeight: "bold" }}>Camera Admin</h1>
      <div className="flex center">
        <div className="boxVideo">
          <div className="title">Camera 1</div>
          <ReactPlayer
            url="https://youtu.be/If6pOnTkQbw"
            width="450px"
            height="280px"
            playing={true}
            loop={true}
            controls={false}
            muted={true}
            style={{
              backgroundColor: "#222",
              borderRadius: "10px",
              border: "2px solid #ccc",
              padding: "10px",
            }}
          />
        </div>
        <div className="boxVideo">
          <div className="title">Camera 2</div>
          <ReactPlayer
            url="https://youtu.be/6Prys88XjAw"
            width="450px"
            height="280px"
            playing={true}
            loop={true}
            controls={false}
            muted={true}
            style={{
              backgroundColor: "#222",
              borderRadius: "10px",
              border: "2px solid #ccc",
              padding: "10px",
            }}
          />
        </div>
      </div>
      <div className="flex center">
        <div className="boxVideo">
          <div className="title">Camera 3</div>
          <ReactPlayer
            url="https://youtu.be/hteWzlBzs74"
            width="450px"
            height="280px"
            playing={true}
            loop={true}
            controls={false}
            muted={true}
            style={{
              backgroundColor: "#222",
              borderRadius: "10px",
              border: "2px solid #ccc",
              padding: "10px",
            }}
          />
        </div>
        <div className="boxVideo">
          <div className="title">Camera 4</div>
          <ReactPlayer
            url="https://youtu.be/kzd4CLKSSpg"
            width="450px"
            height="280px"
            playing={true}
            loop={true}
            controls={false}
            muted={true}
            style={{
              backgroundColor: "#222",
              borderRadius: "10px",
              border: "2px solid #ccc",
              padding: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Camera;
