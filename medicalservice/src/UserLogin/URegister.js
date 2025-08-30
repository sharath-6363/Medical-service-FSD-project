import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ulogin from "../immagess/Ulogin.jpg";
import "./Register.css";

function URegister() {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Copassword, setCopassword] = useState("");
const[Listerror,setListerror]=useState("");
  const HandleName = (e) => {
    setName(e.target.value);
  };
  const HandleEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandlePassword = (e) => {
    setPassword(e.target.value);
  };
  const HandleCopassword = (e) => {
    setCopassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Name === "" || Email === "" || Password === "" || Copassword === "") {
      setListerror("Fill in all the required information!");
    } else if (Password.length < 6) {
      setListerror("Password should be at least 6 characters");
    } else if (Password !== Copassword) {
      setListerror("Passwords do not match");
    } else {
      try {
        const response = await fetch("http://localhost:8080/postulogin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uname: Name,
            uemail: Email,
            upassword: Password,
          }),
        });

        if (response.ok) {
          alert("Registration completed");
          navigate("/Ulogin");
        } else {
          alert("Failed to register. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setListerror("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container card">
      <div className="row ">
        <div className="col-md-6">
          <img src={Ulogin} alt="login img" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="register-form">
            <h1>User Register </h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="reg-input"
                className="form-control"
                onChange={HandleName}
                value={Name}
                placeholder=" User Name"
              />
           

              <input
                type="email"
                id="reg-input"
                className="form-control"
                onChange={HandleEmail}
                value={Email}
                placeholder="User Email"
              />
      

              <input
                type="password"
                className="form-control"
                id="reg-input"
                onChange={HandlePassword}
                value={Password}
                placeholder="Enter Password"
              />
           

              <input
                type="password"
                className="form-control"
                id="reg-input"
                onChange={HandleCopassword}
                value={Copassword}
                placeholder="Enter Confirm Password"
              />
              
              <p className="text-danger fs-6" >{Listerror}</p>
              <input
              className="form-control"
                id="btn-submit"
                type="submit"
                value="Submit"
                dir="submit"
              />

              <div className="reg-aline">
                <p className="reg-p">
                  OR<br/>
                  Already have an account? <Link to="/Ulogin">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default URegister;
