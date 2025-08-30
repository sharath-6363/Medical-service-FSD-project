import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../ComponentsCSS/RepliesPage.css";
import { Visitorcontext } from "../Visitorcontext.js";

const QureiesandReplies = () => {
  const { vconst } = useContext(Visitorcontext);
  const [queries, setQueries] = useState([]);
  
  const getresults = async () => {
    const response = await axios.get("http://localhost:8080/FindQurey");
    const queriesWithReplies = response.data.filter(
      (user) => user.replies !== "" && user.email === vconst.uemail
    );
    setQueries(queriesWithReplies);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getresults();
    };
    fetchData();
  }, [getresults]); 
  return (
    <>
      <center>
        <h2 className="text mt-5">Queries and Replies</h2>
        <div className="registered-container">
          <table className="table table-bordered border-primary">
            <thead className="table-dark">
              <tr className="text-center">
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Queries</th>
                <th>Replies</th>
                <th>Doctor</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((user, index) => (
                <>
                  <tr key={user.id || index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.qurey}</td>
                    <td>{user.replies}</td>
                    <td>{user.doctor}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
};
export default QureiesandReplies;
