import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../ComponentsCSS/ContactUsPage.css";
import { PiPhoneCallFill } from "react-icons/pi";
import { BiSolidTimeFive } from "react-icons/bi";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoLocationSharp } from "react-icons/io5";
function ContactUsPage() {
  const LocationData = [
    {
      id: 1,
      link: "https://www.google.com/maps/place/Government+CPC+Polytechnic/data=!4m7!3m6!1s0x3baf7068b435a859:0xa57d7f8d3988fc33!8m2!3d12.3236946!4d76.6592618!16s%2Fg%2F1tgxghz9!19sChIJWag1tGhwrzsRM_yIOY1_faU?authuser=0&hl=en&rclk=1",
    },
  ];
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  const HandleName = (e) => {
    setName(e.target.value);
  };
  const HandleEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Name === "" || Email === "" || Message === "") {
      alert("Fill all details");
    } else {
      try {
        const response = await axios.post("http://localhost:8080/postccus", {
          cname: Name,
          cemail: Email,
          message: Message,
        });

        if (response.status === 200) {
          alert("message submitted");
          window.location.reload();
        } else {
          alert("Failed to submit message. Please try again.");
        }
      } catch (error) {
        console.error("Error during mesage submission:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const [, setQureies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/getccus")
      .then((response) => setQureies(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((update) => (update.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <>
      <div>
        <center>
          <h5 className="con-h1">ContactUs</h5>
        </center>
      </div>
      <div>
        <form className="con-form">
          <input
            type="text"
            placeholder="User Name"
            onChange={HandleName}
            value={Name}
            className="form-control"
          />
          <br />
          <input
            type="emile"
            placeholder="User Email"
            onChange={HandleEmail}
            value={Email}
            className="form-control"
          />
          <br />
          <textarea
            className="form-control"
            rows="4"
            cols="30"
            placeholder="Type your Message here"
            onChange={HandleMessage}
            value={Message}
          />
          <br />
          <input
            type="Submit"
            onClick={handleSubmit}
            className="btn btn-primary w-100"
          />
        </form>
        <div className="con-alineBox">
          <div className="con-MakeCall  card  my-bold-text my-centered-text text-dark">
            <p class="my-text">
              <PiPhoneCallFill className="text-success" />
              <br /> Contact Ph-
              <br />
              1(12345-67890)
              <br />
              2(09876-54321)
            </p>
          </div>
          <div className="con-Location card my-bold-text my-centered-text text-dark">
            {LocationData.map((service) => (
              <div key={service.id}>
                <h3 id="con-location">{service.title}</h3>
                <Link
                  to={service.link}
                  className="con-link my-bold-text my-centered-text text-dark"
                >
                  <IoLocationSharp className="text-primary" />
                  <br />
                  Location
                  <br />
                  8MF5+FPC,Ashoka Rd,Earangere,Rajendra Nagar, Mysuru,Karnataka
                  570007
                </Link>
              </div>
            ))}
          </div>
          <div className="con-Hours card my-bold-text my-centered-text text-dark">
            <p class="my-italic-text my-margined-text">
              <BiSolidTimeFive className="text-info" />
              <br />
              Hours
              <br />
              Mon-fri-9am-to-6pm--sat-sun-9am-4pm
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsPage;
