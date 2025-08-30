import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./QureiesandReplies.css";

const QureiesandReplies = () => {
  const [Qureies, setQureies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/FindQurey")
      .then((response) => setQureies(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <center>
      <div class="registered-container">
        <center>
          <h3> Qureies and Replies</h3>
          <table class="table table-bordered">
            <thead class="table-dark">
              <tr id="tr-style " className="text-center">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Qureies</th>
                <th>Replies</th>
                <th>Doctor</th>
                <th>Hospital</th>
              </tr>
            </thead>
            <tbody class="align-top">
              {Qureies.map((user, index) => (
                <tr key={index} className="text-center ">
                  <th>{index + 1}</th>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.qurey}</th>
                  <th>{user.replies}</th>
                  <th>{user.doctor}</th>
                  <th>{user.hospital}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
    </center>
  );
};
export default QureiesandReplies;
