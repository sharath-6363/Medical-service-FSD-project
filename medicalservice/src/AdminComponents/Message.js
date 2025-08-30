import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Message() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getccus")
      .then((response) => {
        const usersWithReplies = response.data.filter(
          (user) => user.replay === null
        );
        setUsers(usersWithReplies);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <>
      <div className="rep-h1">
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Message</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.cname}</td>
                <td>{user.message}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => sendEmail(user.cemail)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
