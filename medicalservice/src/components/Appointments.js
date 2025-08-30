import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../ComponentsCSS/Appointments.css";
import Oneapp from "./oneapp.js";
import { Visitorcontext } from "../Visitorcontext.js";
import { SelectService } from "../Selectservice.js";

const timeSlots = [
  "9:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
];

const Appointments = () => {
  const { selectService } = useContext(SelectService);
  const { vconst } = useContext(Visitorcontext);

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDetails, setSelectedDetails] = useState(null);
  const genders = ["Male", "Female"];
  const Email = vconst.uemail;

  useEffect(() => {
    if (selectService) {
      if (selectService.doctor) setDoctors(selectService.doctor);
      if (selectService.service) {
        const serviceArray = Array.isArray(selectService.service)
          ? selectService.service
          : [selectService.service];
        setServices(serviceArray);
      }
      if (selectService.hospital) setHospitals(selectService.hospital);

      if (selectService.service && selectService.service.length > 0) {
        setSelectedService(selectService.service[0]);
      }
    }
  }, [selectService]);

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const submitDetails = async () => {
    if (!selectedService || !name || !gender || !time || !date) {
      alert("Please fill in all details before submitting.");
      return;
    }

    try {
      const selectedDoctorIndex = doctors.indexOf(selectedService);
      const selectedHospitalIndex = hospitals.indexOf(selectedService);

      const response = await axios.post("http://localhost:8080/Appointment", {
        service: selectService.service,
        doctorname: selectService.doctor,

        hospitalname: selectService.hospital,

        aname: name,
        gender: gender,
        atimeslot: time,
        date: date,
        email: Email,
      });

      if (response.status === 200) {
        alert("Appointment submitted successfully!");
        window.location.reload();
      }

      const responseData = response.data;
      console.log(responseData);

      const details = {
        name,
        gender,
        service: selectService.service,
        doctorname:
          selectedDoctorIndex !== -1 ? doctors[selectedDoctorIndex] : "",
        hospitalname:
          selectedHospitalIndex !== -1 ? hospitals[selectedHospitalIndex] : "",
        time,
        date,
        email: Email,
      };

      setSelectedDetails(details);
    } catch (error) {
      console.error("Error submitting details:", error.message);
    }
  };

  return (
    <div className="App-container mt-4">
      <h4 className="text-center ">Doctor Appointment</h4>

      <div>
        <h5 className="text-primary mt-4">Select a Service</h5>
        <select
          className="form-select"
          value={selectedService}
          onChange={(e) => handleSelectService(e.target.value)}
        >
          {services &&
            services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
        </select>
      </div>
      {selectedService && (
        <div>
          <h5 className="text-primary mt-4">Enter Details for {selectedService.service}</h5>
          <label htmlFor="name">Name:</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="gender">Gender:</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled>
              Select a Gender
            </option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control mt-2 mb-2"
          />

          <select
            className="form-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="" disabled>
              Select a Time Slot
            </option>
            {timeSlots.map((timeSlot) => (
              <option key={timeSlot} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>

          <button
            className="d-grid gap-2 col-6 mx-auto m-4 rounded"
            type="button"
            onClick={submitDetails}
          >
            Submit Details
          </button>
        </div>
      )}
      {selectedDetails && <Oneapp selectedDetails={selectedDetails} />}
    </div>
  );
};

export default Appointments;
