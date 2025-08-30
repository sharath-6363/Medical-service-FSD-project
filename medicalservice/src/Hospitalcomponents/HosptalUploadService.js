import React, { useState, useEffect, useContext } from "react";
import "./HospitalCSS/HospitalUploadService.css";
import axios from "axios";
import { usercontext } from "../usecontaxct.js";

const HospitalUpdateService = () => {
  const { cont } = useContext(usercontext);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [DoctorImage, setDoctorImage] = useState("");
  const [getedservice, setGetedservice] = useState([]);
  const [updateData, setUpdateData] = useState({
    service: "",
    doctor: "",
    hospital: cont.name,
    price: "",
    description: "",
    category: "",
  });
  const [editdoctor, setEditDoctor] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/catogary");
        setServiceCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getservice");
        const usersWithReplies = response.data.filter(
          (item) => item.hospital === cont.name
        );
        setGetedservice(usersWithReplies);
        console.log(cont.name);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [cont.name]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditDoctor(getedservice[index].doctor);
    setEditedPrice(getedservice[index].price);
  };

  const handlePriceChange = (e) => {
    setEditedPrice(e.target.value);
  };

  const handleDoctorChange = (e) => {
    setEditDoctor(e.target.value);
  };

  const handleUpdate = async (index) => {
    try {
      const updatedService = {
        ...getedservice[index],
        doctor: editdoctor,
        price: editedPrice,
      };

      const response = await axios.put(
        `http://localhost:8080/updateService/${updatedService.id}`,
        updatedService
      );

      if (response.status === 200) {
        const updatedServices = [...getedservice];
        updatedServices[index] = updatedService;
        setGetedservice(updatedServices);
        setEditIndex(-1);
        setEditedPrice("");
        setEditDoctor("");
        alert("Doctor's name and price updated successfully.");
      } else {
        alert("Failed to update doctor's name and price. Please try again.");
      }
    } catch (error) {
      console.error("Error updating doctor's name and price:", error);
      alert(
        "An error occurred while updating doctor's name and price. Please try again later."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updateData.category || !DoctorImage) {
      alert("Please select a service category and upload an image.");
    } else {
      try {
        const requestData = {
          ...updateData,
          image: DoctorImage,
        };

        const response = await axios.post(
          "http://localhost:8080/postService",
          requestData
        );

        if (response.status === 200) {
          alert("Service submitted successfully.");
          window.location.reload();
        } else {
          alert("Failed to update. Please try again.");
        }
      } catch (error) {
        console.error("Error during update:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="upd-serv">
        <h3 className="update-service-header text-center">Update Services</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <select
              className="form-select"
              name="category"
              value={updateData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Service Category</option>
              {serviceCategories.map((category, index) => (
                <option key={index} value={category.category}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <input
              type="text"
              className="form-control"
              id="service"
              name="service"
              value={updateData.service}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Doctor:</label>
            <input
              type="text"
              className="form-control"
              id="doctor"
              name="doctor"
              value={updateData.doctor}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hospital">Hospital:</label>
            <input
              type="text"
              className="form-control"
              id="hospital"
              name="hospital"
              value={cont.name}
             
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              className="form-control form-label"
              id="image"
              name="image"
              onChange={handelimage}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={updateData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              rows={3}
              id="description"
              name="description"
              value={updateData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update All
          </button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Doctor</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getedservice.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.service}</td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editdoctor}
                      onChange={handleDoctorChange}
                    />
                  ) : (
                    item.doctor
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedPrice}
                      onChange={handlePriceChange}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <button onClick={() => handleUpdate(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HospitalUpdateService;
