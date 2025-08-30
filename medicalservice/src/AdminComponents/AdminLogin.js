import React, { useState } from "react";
import "./AdminLoginForm.css";
import { useNavigate } from "react-router-dom";

import admini from "../immagess/admin.jpg";
function AdminLogin() {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/adminsave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify({
          username: username,
          password: password,
          logintype: "admin",
        }),
      });

      if (response.ok) {
        navigate("/AdminMain");
      } else {
        setLoginStatus("Login failed. Please check your credentials.");
      }
    } catch (hi) {
      setLoginStatus("An error occurred during login. Please try again later.");
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  return (
    <div id="Admin-Log-form" className="container card ">
      <div className="row ">
        <div className="col-md-6">
          <img src={admini} alt="login img" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="register-form">
            <h1>Admin Login </h1>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                id="reg-input"
                className="form-control"
                onChange={handleName}
                value={username}
                placeholder=" Admin ID"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
