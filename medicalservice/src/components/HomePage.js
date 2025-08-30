import React from "react";
import "../ComponentsCSS/Home.css";
import { Link } from "react-router-dom";
import photo from "../immagess/happiness-bargain-clinic-bed-equipment.jpg";
import { CgLogOut } from "react-icons/cg";

function Header() {
  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg  bg-primary">
        <div className="container-md ">
          <h3 className="text-light">Medical Service</h3>
          <div className="dropdown">
            <button className="dropbtn">
              Log-In As-
              <CgLogOut width="20px" height="20px" />
            </button>
            <div className="dropdown-content">
              <Link to="/Ulogin">Log-In User</Link>
              <Link to="/HospitalLogin">Log-in Hospital</Link>
              <Link to="/AdminLogin">Log-In Admin</Link>
            </div>
          </div>
        </div>
      </nav>
      <header className="header-container"></header>
      <div className="homeContainer">
      <img src={photo} alt="Home page images" class="full-width-image" />


        <div className="home-wellcome">
          <h1 id="home-h1">WE CARE ABOUT YOUR HEALTH </h1>
          <h4 id="home-h4">Your health is our priority</h4>
          <p id="home-ppp">
            We have the best hospitals of the country <br />
            With their services, you can get the Appointments easily from the
            Available hospitals <strong className="text-dark">.</strong>
          </p>
        </div>

        <Link to="/Ulogin" className="home-Login">
          <h4>Log-in To GetService</h4>
        </Link>
    
      </div>
    </>
  );
}

export default Header;
