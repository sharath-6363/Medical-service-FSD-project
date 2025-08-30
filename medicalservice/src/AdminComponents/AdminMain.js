import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../AdminComponents/AdminMain.css";

import { BsBoxArrowInRight } from "react-icons/bs";
function AdminMain() {
  return (
    <div>
      <header className="Adminmain-container">
        <Link to="/"></Link>
        <Link to="/AdminMain/" className="Adminmain-link">
          RegisteredHospital
        </Link>
        <Link to="/AdminMain/QureiesandReplies" className="Adminmain-link">
          QureiesandReplies
        </Link>
        <Link to="/AdminMain/UpdateCatogarys" className="Adminmain-link">
          {" "}
          UpdateCatogarys
        </Link>
        <Link to="/AdminMain/Message" className="Adminmain-link">
          Message
        </Link>
        <Link to="/" className="Adminmain-link">
          LogOut
          <BsBoxArrowInRight className="Adminmainlogout-log" />
        </Link>
      </header>
      <Outlet />
    </div>
  );
}

export default AdminMain;
