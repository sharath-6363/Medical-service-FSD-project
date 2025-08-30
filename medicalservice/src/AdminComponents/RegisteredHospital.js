import axios from "axios";
import React, { useState, useEffect } from "react";
import "./RegisteredHospital.css";

const RegisteredHospital = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/Find")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <center>
      <div className="registered-container">
        <center>
          <h3 className="table-header">Register Hospital</h3>
          <table class="table table-bordered">
            <thead class="table-dark">
              <tr className="table-header-row">
                <th>Id</th>
                <th>Hospital Name</th>
                <th>Hospital Email</th>
                <th>Hospital Phone</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {Users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
    </center>
  );
};

export default RegisteredHospital;
