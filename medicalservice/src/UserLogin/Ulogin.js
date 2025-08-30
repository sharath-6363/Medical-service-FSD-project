import React, { useContext, useState } from "react";
import "./Ulogin.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Visitorcontext } from "../Visitorcontext.js";
import Ulogini from "../immagess/Ulogin.jpg";
function Ulogin() {
  const { setvconst } = useContext(Visitorcontext);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setLoginStatus("Fill all requirment");
    } else
      try {
        const response = await fetch("http://localhost:8080/loginuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uemail: email,
            upassword: password,
            logintype: "userlogin",
          }),
        });

        if (response.ok) {
          const vuserdata = await response.json();
          setvconst(vuserdata);
          navigate("/Main");
        } else {
          setLoginStatus("Login failed. Please check your credentials.");
        }
      } catch (hi) {
        setLoginStatus(
          "An error occurred during login. Please try again later."
        );
      }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleemail = (e) => {
    setemail(e.target.value);
  };
  return (
    <div className="container card">
      <div className="row ">
        <div className="col-md-6">
          <img src={Ulogini} alt="login img" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="register-form">
            <h1>User Login </h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                id="reg-input"
                className="form-control"
                onChange={handleemail}
                value={email}
                placeholder=" User Id (Email)"
              />
              <br />

              <input
                type="password"
                className="form-control"
                id="reg-input"
                onChange={handlePassword}
                value={password}
                placeholder="Enter Password"
              />
              <br />
              <p className="text-danger fs-6">{LoginStatus}</p>

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
                  Don't have any account? <Link to="/URegister">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ulogin;
