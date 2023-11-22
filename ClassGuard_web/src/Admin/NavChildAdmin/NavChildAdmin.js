import React from "react";
import "./NavChildAdmin.scss";
import { UilEstate } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import { CameraOutlined, AlertOutlined } from "@ant-design/icons";
function NavChildAdmin() {
  return (
    <div className="NavChildAdmin">
      <nav>
        <span>
          <Link to="/admin" style={{ display: "flex" }}>
            <UilEstate className="i" />
            <p className="link-name">Dahsboard</p>
          </Link>
        </span>
        <span>
        <Link to="/admin/camera" style={{ display: "flex" }}>
          <CameraOutlined className="i" />
          <p className="link-name">Camera</p>
        </Link>
        </span>
        <span>
        <Link to="/admin/alert" style={{ display: "flex" }}>
          <AlertOutlined className="i" />
          <p className="link-name">Alert</p>
        </Link>
        </span>
      </nav>
    </div>
  );
}

export default NavChildAdmin;
