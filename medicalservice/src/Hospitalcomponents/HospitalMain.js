import { Link, Outlet } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import "./HospitalCSS/HospitalMain.css";
import { ImProfile } from "react-icons/im";
import { useContext } from "react";
import { usercontext } from "../usecontaxct.js";
function HospitlMain() {
  const { cont } = useContext(usercontext);
  return (
    <div>
      <header className="Hospital-container">
        <Link to="/HospitalLogin"></Link>
        <Link to="/HospitalRegister" className="Hospital-link"></Link>
        <h4 className=" Hospital-link text- text-center text-uppercase ml-4 ">
          {cont.name}
        </h4>
        <Link to="/HospitalMain/" className="Hospital-link">
          UploadService
        </Link>
        <Link
          to="/HospitalMain/HospitalUpdateProfile"
          className="Hospital-link"
        >
          UpdateProfile
          <ImProfile />
        </Link>
        <Link to="/HospitalMain/HospitalReplyQueries" className="Hospital-link">
          RepliesQueries
        </Link>
        <Link to="/HospitalMain/Apointment" className="Hospital-link">
          Appointments
        </Link>
        <Link to="/HospitalLogin" className="Hospital-link">
          LogOut <BsBoxArrowInRight className="logout-log" />
        </Link>
      </header>
      <Outlet />
    </div>
  );
}

export default HospitlMain;
