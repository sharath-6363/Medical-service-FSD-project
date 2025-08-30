import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HospitalCSS/HospitalLoginForm.css";
import doctorlog from "../immagess/doctorlog_-removebg-preview.png";
import { usercontext } from "../usecontaxct.js";
function HospitalLogin() {
  const { setcont } = useContext(usercontext);
  const [email, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Listmssgae, setListmssgae] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/loginhospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: Password,
          logintype: "hospital",
        }),
      });

      if (response.ok) {
        const userdata = await response.json();
        setcont(userdata);
        alert("Log-In Successful. ");
        navigate("/HospitalMain");
      } else {
        setListmssgae("Error while logging in !");
      }
    } catch (error) {
      setListmssgae("An error occurred during login !");
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className="container card">
      <div className="row ">
        <div className="col-md-6">
          <img src={doctorlog} alt="login img" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="register-form">
            <h1> Hospital Login </h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                id="reg-input"
                className="form-control"
                onChange={handleName}
                value={email}
                placeholder=" Hospital ID (Email)"
              />
              <br />

              <input
                type="password"
                className="form-control"
                id="reg-input"
                onChange={handlePassword}
                value={Password}
                placeholder="Enter Password"
              />
              <br />
              <p className="text-danger fs-6">{Listmssgae}</p>

              <input
                className="form-control"
                id="btn-submit"
                type="submit"
                value="Submit"
                dir="submit"
              />

              <div className="reg-aline">
                <p className="reg-p">
                  OR
                  <br />
                  Don't have any account?{" "}
                  <Link to="/HospitalRegister">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalLogin;
