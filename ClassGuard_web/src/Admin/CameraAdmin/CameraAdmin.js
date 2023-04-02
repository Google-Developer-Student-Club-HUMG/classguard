import React from "react";
import "./CameraAdmin.scss"
import { UilEstate } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
function CameraAdmin() {
  return (
    <div className="CameraAdmin">
      <nav>
        <Link to="/admin" style={{ display: 'flex' }}>
          <UilEstate className="i" />
          <p className="link-name">Dahsboard</p>
        </Link>
      </nav>
    </div>
  )
}

export default CameraAdmin;
