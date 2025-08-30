import React, { useState, useEffect } from "react";
import "./HospitalCSS/HospitalReplyQueries.css";
import axios from "axios";
import Update from "./update.js";
import { useContext } from "react";
import { usercontext } from "../usecontaxct.js";

export default function HospitalReplyQueries() {
  const { cont } = useContext(usercontext);
  const [Users, setUsers] = useState([]);
  const [Replies, setReplies] = useState({});
  const [Reply, setReply] = useState("");
  const [Showreplay, setShowreplay] = useState(false);
  const [Qureies, setQureies] = useState([]);
  const [Doctor, setDoctor] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/FindQurey")
      .then((response) => {
        const usersWithReplies = response.data.filter(
          (user) => user.replies === null && user.hospital === cont.name
        );
        setUsers(usersWithReplies);
        setQureies(response.data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [Replies, Showreplay, cont.name]);

  const handleViewReplay = () => {
    setShowreplay(!Showreplay);
  };

  return (
    <>
      <div className="rep-h1">
        <h4 className=" text-danger text-center text-uppercase ml-4 ">
          {cont.name}
        </h4>
        <table className="table  table-border text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Query</th>
              <th>Reply</th>
              <th>Doctor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Users.map((user) => (
              <Update
                key={user.id}
                user={user}
                setReplies={setReplies}
                Reply={Reply}
                setReply={setReply}
                Doctor={Doctor}
                setDoctor={setDoctor}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        className="btn btn-primary"
        type="button"
        onClick={handleViewReplay}
      >
        View Queries & Replies
      </button>

      {Showreplay && (
        <center>
          <h3 id="new-id-h3">Queries and Replies</h3>
          <div className="registered-container">
            <table className="table table-bordered">
              <thead className="table-primary">
                <tr id="tr-style">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Queries</th>
                  <th>Replies</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {Qureies.map(
                  (user, index) =>
                    user.hospital === cont.name && (
                      <tr key={user.id || index}>
                        <th>{index + 1}</th>
                        <th>{user.name}</th>
                        <th>{user.email}</th>
                        <th>{user.qurey}</th>
                        <th>{user.replies}</th>
                        <th>{user.doctor}</th>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </center>
      )}
    </>
  );
}
