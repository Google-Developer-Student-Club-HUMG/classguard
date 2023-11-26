import React from "react";
import "./Alert.scss";
import NavChildAdmin from "../NavChildAdmin/NavChildAdmin";
function AlertAdmin() {
  return (
    <div>
      <NavChildAdmin />
      <div className="notification">
        <img src="image.jpg" alt="Notification Image" />
        <div className="notification-content">
          <h3>Cảnh báo hành vi xấu!!!</h3>
          <p>Tại phòng A201: Phát hiện hút thuốc</p>
          <span className="notification-date">10/10/2023</span>
        </div>
      </div>
      <div className="notification">
        <img src="image.jpg" alt="Notification Image" />
        <div className="notification-content">
          <h3>Cảnh báo bạo lực!!!</h3>
          <p>Sảnh D: Phát hiện hành vi gây gổ!</p>
          <span className="notification-date">11/10/2023</span>
        </div>
      </div>
      <div className="notification">
        <img src="image.jpg" alt="Notification Image" />
        <div className="notification-content">
          <h3>Cảnh báo vũ khí!!!</h3>
          <p>Sảnh D: Phát hiện vũ khí thô sơ!</p>
          <span className="notification-date">11/10/2023</span>
        </div>
      </div>
      <div className="notification">
        <img src="image.jpg" alt="Notification Image" />
        <div className="notification-content">
          <h3>Cảnh báo hành vi xấu!!!</h3>
          <p>Sảnh nhà A: Phát hiện hành vi gây gổ!</p>
          <span className="notification-date">18/12/2022</span>
        </div>
      </div>
      
    </div>
  );
}

export default AlertAdmin;
