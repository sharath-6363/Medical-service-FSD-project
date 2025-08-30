import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Notcontaxt } from "../Notcontaxt";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const { setNotconst } = useContext(Notcontaxt);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getappoint");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleReject = async (id, name, email) => {
    try {
      await axios.delete(`http://localhost:8080/deletmaping/${id}`);
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );
      setAppointments(updatedAppointments);
      alert("Appointment Rejected");
      handleNotify(`Appointment for "${name}" rejected successfully`, email);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleAccept = async (id, name, date, email, hospitalname) => {
    try {
      await axios.delete(`http://localhost:8080/deletmaping/${id}`);
      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );
      setAppointments(updatedAppointments);
      alert("Appointment Accepted");
      handleNotify(
        `Appointment for "${name}" accepted successfully. Visit the"${hospitalname}"  on "${date}"`,
        email
      );
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const handleNotify = async (message, email) => {
    try {
      const response = await fetch("http://localhost:8080/PostNotify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification: message,
          email: email,
        }),
      });
      const vuserdata = await response.json();
      setNotconst(vuserdata);
    } catch (error) {
      console.error("Error posting notification:", error);
    }
  };

  return (
    <div className="row">
      {appointments.map((item) => (
        <div
          key={item.id}
          className="card d-flex w-25 h-25 mt-3 m-4 text-center "
        >
          <p>Patient Name: {item.aname}</p>
          <p>Gender: {item.gender}</p>
          <p>Selected Service: {item.service}</p>
          <p>Selected Doctor: {item.doctorname}</p>
          <p>Time Slot: {item.atimeslot}</p>
          <p>Date: {item.date}</p>
          <button onClick={() => handleReject(item.id, item.aname, item.email)}>
            Reject
          </button>
          <button
            onClick={() =>
              handleAccept(
                item.id,
                item.aname,
                item.date,
                item.email,
                item.hospitalname
              )
            }
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
