import React, { useState } from "react";
import "./HospitalCSS/HospitalUpdateProfile.css";

const HospitalUpdateProfile = ({ onUpdateDoctorDetails }) => {
  const [DoctorName, setDoctorName] = useState("");
  const [DoctorImage, setDoctorImage] = useState("");
  const [AboutDoctor, setAboutDoctor] = useState("");
  const [Contact, setContact] = useState();

  const handleContact = (e) => {
    setContact(e.target.value);
  };
  const handelimage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setDoctorImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDoctorName = (e) => {
    setDoctorName(e.target.value);
  };

  const handleAboutDoctor = (e) => {
    setAboutDoctor(e.target.value);
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (DoctorName === "" || DoctorImage === "" || AboutDoctor === "") {
      alert("Fill in all the required information!");
    } else {
      try {
        const response = await fetch("http://localhost:8080/postProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            doctorname: DoctorName,
            image: DoctorImage,
            aboutdoctor: AboutDoctor,
            contact: Contact,
          }),
        });

        if (response.ok) {
          alert("Profile posted successfully");
          window.location.reload();
          onUpdateDoctorDetails({
            DoctorName,
            Immage: <img src={DoctorImage} alt={DoctorName} />,
            AboutDoctor,
            link: "https://example.com",
          });

          setDoctorName("");
          setDoctorImage("");
          setAboutDoctor("");
        } else {
          alert("Failed to post profile. Please try again.");
        }
      } catch (error) {
        console.error("Error during profile post:", error);
      }
    }
  };
  return (
    <>
      <center>
        <h2 id="upd-servr">Update Profile</h2>
      </center>
      <form className="update-form">
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          onChange={handleDoctorName}
          value={DoctorName}
          placeholder="Enter DoctorName"
        />
        Select Photo:
        <input
          type="file"
          class="form-control m-1"
          id="inputGroupFile02"
          onChange={handelimage}
          accept="image/*"
          placeholder="Enter DoctorImage"
        />
        Contact Number
        <input
          type="text"
          class="form-control m-1"
          id="exampleFormControlInput1"
          onChange={handleContact}
          value={Contact}
          placeholder="Enter Contact No.(optional )"
        />
        About Doctor:
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="4"
          cols="30"
          value={AboutDoctor}
          onChange={handleAboutDoctor}
        />
        <button id="upd-btn" type="submit" className="btn btn-primary" onClick={handleUpdateProfile}>
          Post Profile
        </button>
      </form>
    </>
  );
};
export default HospitalUpdateProfile;
