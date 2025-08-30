import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Mss from "./components/HomePage";
import Service from "./components/ServiceDetailsPage";
import QueryPage from "./components/QueryPage";
import Content from "./components/ContactUsPage";
import Replies from "./components/RepliesPage";
import About from "./components/AboutUsPage";
import Appointment from "./components/Appointments";
import Management from "./components/Aboutmanagement";
import AboutClinic from "./components/AboutClinic";
import AboutDeportment from "./components/AboutDeportment";
import AdminMain from "./AdminComponents/AdminMain";
import AdminLogin from "./AdminComponents/AdminLogin";
import QureiesandReplies from "./AdminComponents/QureiesandReplies";
import RegisteredHospital from "./AdminComponents/RegisteredHospital";
import HospitalLogin from "./Hospitalcomponents/HospitalLogin";
import HospitlMain from "./Hospitalcomponents/HospitalMain";
import HospitalReplyQueries from "./Hospitalcomponents/HospitalReplyQueries";
import HospitalUpdateProfile from "./Hospitalcomponents/HospitalUpdateProfile";
import HospitalRegisterForm from "./Hospitalcomponents/HospitalRegister";
import HospitalUpdateService from "./Hospitalcomponents/HosptalUploadService";
import Message from "./AdminComponents/Message.js";
import Ulogin from "./UserLogin/Ulogin.js";
import URegister from "./UserLogin/URegister.js";
import { usercontext } from "./usecontaxct";
import { useState, useEffect } from "react";
import { Visitorcontext } from "./Visitorcontext.js";
import { Notcontaxt } from "./Notcontaxt.js";
import Appointments from "./Hospitalcomponents/Appointment.js";
import UpdateCatogarys from "./AdminComponents/UpdateCatogarys.js";
import { SelectService } from "./Selectservice.js";
function App() {
  const [selectService, setSelectService] = useState({});
  const [Notconst, setNotconst] = useState({});
  const [vconst, setvconst] = useState(() => {
    try {
      const item = window.localStorage.getItem("vconst");
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem("vconst", JSON.stringify(vconst));
  }, [vconst]);
  const [cont, setcont] = useState(() => {
    try {
      const item = window.localStorage.getItem("cont");
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem("cont", JSON.stringify(cont));
  }, [cont]);
  return (
  <div>
    
      <SelectService.Provider value={{ selectService, setSelectService }}>
        <Notcontaxt.Provider value={{ Notconst, setNotconst }}>
          <Visitorcontext.Provider value={{ vconst, setvconst }}>
            <usercontext.Provider value={{ cont, setcont }}>
              <Router>
                <Routes>
                  <Route path="/" element={<Mss />}></Route>
                  <Route path="Ulogin" element={<Ulogin />} />
                  <Route path="Uregister" element={<URegister />} />
                  <Route path="/Main" element={<Main />}>
                    <Route path="Content" element={<Content />} />
                    <Route index element={<Service />} />
                    <Route path="QueryPage" element={<QueryPage />} />
                    <Route path="RepliesPage" element={<Replies />} />
                    <Route path="AboutUsPage" element={<About />} />
                    <Route path="Appointments" element={<Appointment />} />
                    <Route path="Aboutmanagement" element={<Management />} />
                    <Route path="AboutClinic" element={<AboutClinic />} />
                    <Route
                      path="AboutDeportment"
                      element={<AboutDeportment />}
                    />
                    {/* <Route path="Notification" element={<Notification/>}/> */}
                  </Route>
                  <Route path="/AdminLogin" element={<AdminLogin />} />
                  <Route path="AdminMain" element={<AdminMain />}>
                    <Route index element={<RegisteredHospital />} />
                    <Route
                      path="QureiesandReplies"
                      element={<QureiesandReplies />}
                    />
                    <Route
                      path="UpdateCatogarys"
                      element={<UpdateCatogarys />}
                    />
                    <Route path="Message" element={<Message />}></Route>
                  </Route>
                  <Route path="/HospitalLogin" element={<HospitalLogin />} />
                  <Route
                    path="HospitalRegister"
                    element={<HospitalRegisterForm />}
                  />
                  <Route path="HospitalMain" element={<HospitlMain />}>
                    <Route
                      path="HospitalUpdateProfile"
                      element={<HospitalUpdateProfile />}
                    />
                    <Route
                      path="HospitalReplyQueries"
                      element={<HospitalReplyQueries />}
                    />
                    <Route index element={<HospitalUpdateService />} />
                    <Route path="Apointment" element={<Appointments />} />
                  </Route>
                </Routes>
              </Router>
            </usercontext.Provider>
          </Visitorcontext.Provider>
        </Notcontaxt.Provider>
      </SelectService.Provider>
      </div>
    
  );
}
export default App;
