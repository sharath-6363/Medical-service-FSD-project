import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { Visitorcontext } from "../Visitorcontext.js";
import { IoIosNotificationsOutline } from "react-icons/io";
import "../ComponentsCSS/Main.css";

function Main() {
  const { vconst } = useContext(Visitorcontext);
  const [getAppointment, setGetAppointment] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getnotify");
        const usersWithReplies = response.data.filter(
          (user) => user.email === vconst.uemail
        );
        setGetAppointment(usersWithReplies);
        setStatus(usersWithReplies.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [vconst.uemail]);

  const toggleNotification = () => {
    setShowNotification((prev) => !prev);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deletNot/${id}`);
      setGetAppointment(getAppointment.filter((item) => item.id !== id));
      setStatus(getAppointment.length - 1 > 0);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div>
      <header className="main-container">
        <div>
          <Link to="/Ulogin"></Link>
          <Link to="/URegister"></Link>
        </div>
        <Link to="/Main/" className="nave-link">
          Service
        </Link>
        <Link to="/Main/Content" className="nave-link ">
          Contact
        </Link>
        <Link to="/Main/QueryPage" className="nave-link">
          Query
        </Link>
        <Link to="/Main/RepliesPage" className="nave-link">
          Replies
        </Link>
        <Link to="/Main/AboutUsPage" className="nave-link">
          About
        </Link>
        <div className={`notification-container ${status ? 'has-notifications' : ''}`}>
          <IoIosNotificationsOutline
            className="fs-3 nave-link"
          
            onClick={toggleNotification}
          />

          {showNotification && (
            <div id="notify12" className="text-ligh">
              {getAppointment.map((item) => (
                <div key={item.id}>
                  <p>{item.notification}</p>
                  <button onClick={() => handleDelete(item.id)} id="timesde">
                    OK
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link to="/" className="nave-link">
          Log-Out
        </Link>
      </header>
      <Outlet />
    </div>
  );
}

export default Main;
