import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../ComponentsCSS/AboutUsPage.css";

const AboutUsPage = () => {
  const [doctorsData, setDoctorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/getprofile");
        const data = await response.json();
        setDoctorsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const maxLength = 80;

  const toggleContent = (id) => {
    setDoctorsData((prevData) =>
      prevData.map((doctor) =>
        doctor.id === id
          ? { ...doctor, showFullContent: !doctor.showFullContent }
          : doctor
      )
    );
  };

  return (
    <>
      <section className="about-section">
        <div className="About-Doctors">
          {doctorsData.map((doctor) => (
            <div key={doctor.id} className="about-card">
              {doctor.link}
              <div className="about-icon">
                <img src={doctor.image} alt="doctors" id="about-img" />
              </div>
              <h3>{doctor.doctorname}</h3>
              <p>Ph.No-{doctor.contact}</p>
              <p>
                {doctor.showFullContent
                  ? doctor.aboutdoctor
                  : doctor.aboutdoctor.slice(0, maxLength)}
              </p>
              {doctor.aboutdoctor.length > maxLength && (
                <Link
                  id="link-to"
                  to={`#${doctor.id}`}
                  onClick={() => toggleContent(doctor.id)}
                >
                  {doctor.showFullContent ? "Show Less" : "..View More"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
      <div className="about-page">
        <p className="about-p">About :-</p>
        <div className="about-Team">
          <Link to="/Main/Aboutmanagement">
            <h4 className="about-Team"> Our Management</h4>
          </Link>
        </div>
        <div className="About-Department">
          <Link to="/Main/AboutDeportment">
            <h4 className="About-Department">Our Department</h4>
          </Link>
        </div>
        <div className="About-Clinic">
          <Link to="/Main/AboutClinic">
            <h4 className="About-Clinic">About our Clinic</h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
