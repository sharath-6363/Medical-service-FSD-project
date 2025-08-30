import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../ComponentsCSS/Query.css";
import { Visitorcontext } from "../Visitorcontext.js";

export default function QueryPage() {
  const { vconst } = useContext(Visitorcontext);
  const [name, setName] = useState("");
  const [email] = useState(vconst.uemail);
  const [query, setQuery] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [hospitals, setHospitals] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };



  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleHospitalChange = (e) => {
    setSelectedHospital(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      query === "" ||
      selectedHospital === ""
    ) {
      alert("Please fill in all details");
    } else {
      try {
        const response = await axios.post("http://localhost:8080/UpdateQurey", {
          name: name,
          email: email,
          qurey: query,
          hospital: selectedHospital,
        });

        if (response.status === 200) {
          alert("Query submitted successfully");
          window.location.reload();
        } else {
          alert("Failed to submit query. Please try again.");
        }
      } catch (error) {
        console.error("Error during query submission:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/Find");
        const data = response.data;
        setHospitals(data.map((item) => item.name));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <center>
          <h1 className="query-h1">User Query</h1>
        </center>
      </div>
      <div>
        <form className="query-form">
          <input
            type="text"
            placeholder="User Name"
            onChange={handleNameChange}
            value={name}
            className="form-control mb-2"
          />
          <br />
          <input
            type="email"
            placeholder={email}
            value={email}
            className="form-control mb-2"
          />
          <br />

          <select
            className="form-select"
            value={selectedHospital}
            onChange={handleHospitalChange}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital, index) => (
              <option key={index} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>

          <textarea
            className="form-control"
            rows="4"
            cols="30"
            placeholder="Type your Query here"
            onChange={handleQueryChange}
            value={query}
          />
          <br />
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary mt-4"
          >
            Submit Query
          </button>
        </form>
      </div>
    </>
  );
}
