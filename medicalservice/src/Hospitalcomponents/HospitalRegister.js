import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HospitalCSS/HospitalRegister.css";
import { Link, useNavigate } from "react-router-dom";
import doctorlog from "../immagess/doctorlog_-removebg-preview.png";

function HospitalRegisterForm() {
  const navigate = useNavigate();
  const [Listmssgae, setListmssgae] = useState("");
  const [Users,setUsers]=useState("")
  const [hospitalInfo, setHospitalInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalInfo({
      ...hospitalInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, phone } = hospitalInfo;

    if (!name || !email || !password || !confirmPassword || !phone) {
      setListmssgae("Fill in all the required information!");
    } else if (password.length < 6) {
      setListmssgae("Password should be at least 6 characters");
    } else if (password !== confirmPassword) {
      setListmssgae("Passwords do not match");
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setListmssgae("Enter a valid 10-digit phone number");
    } else if (Users.some((user) => user.name === name)) {
      setListmssgae("This email is already registered");
    } else {
      try {
        const response = await fetch("http://localhost:8080/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
          }),
        });

        if (response.ok) {
          alert("Registration Successfully Completed");
          navigate("/HospitalLogin");
        } else {
          setListmssgae("Failed to register. Please try again.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setListmssgae("An error occurred. Please try again later.");
      }
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/Find")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <div className="container card">
      <div className="row">
        <div className="col-md-6">
          <img src={doctorlog} alt="login img" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <div className="register-form">
            <h1>Hospital Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="reg-input"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={hospitalInfo.name}
                placeholder="Hospital Name"
              />

              <input
                type="email"
                id="reg-input"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={hospitalInfo.email}
                placeholder="Hospital Email"
              />

              <input
                type="text"
                id="reg-input"
                className="form-control"
                name="phone"
                onChange={handleChange}
                value={hospitalInfo.phone}
                placeholder="Hospital Contact No."
              />

              <input
                type="password"
                className="form-control"
                id="reg-input"
                name="password"
                onChange={handleChange}
                value={hospitalInfo.password}
                placeholder="Enter Password"
              />

              <input
                type="password"
                className="form-control"
                id="reg-input"
                name="confirmPassword"
                onChange={handleChange}
                value={hospitalInfo.confirmPassword}
                placeholder="Confirm Password"
              />
              <p className="text-danger fs-6">{Listmssgae}</p>
              <input
                className="form-control"
                id="btn-submit"
                type="submit"
                value="Submit"
              />

              <div className="reg-aline">
                <p className="reg-p">
                  OR
                  <br />
                  Already have an account?{" "}
                  <Link to="/Hospitallogin">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalRegisterForm;
