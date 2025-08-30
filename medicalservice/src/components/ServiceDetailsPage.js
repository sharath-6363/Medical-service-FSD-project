import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../ComponentsCSS/servise.css";
import { SelectService } from "../Selectservice.js";

const Main = () => {
  const { setSelectService } = useContext(SelectService);
  const [servicesData, setServicesData] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getservice");
      const data = response.data;
      setServicesData(data);
      setFilteredServices(data);
      setSelectService(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = servicesData.filter(
      (item) =>
        item.hospital.toLowerCase().includes(query) &&
        (selectedCategory === "" || item.category === selectedCategory)
    );
    setFilteredServices(filtered);
    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery("");
    filterServicesByCategory(category);
  };

  const filterServicesByCategory = (category) => {
    const filtered = servicesData.filter((item) => item.category === category);
    setFilteredServices(filtered);
    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  };

  const renderServices = () => {
    return filteredServices.map((item, index) => (
      <div key={index} className="service-card text-center">
        <img
          src={item.image}
          alt="service"
          id="service-img"
          className="img-fluid"
        />
        <div className="service-details">
          <div className="service-info">
            <label className="fw-bold m-2">Service:</label>
            <span>{item.service}</span>
          </div>
          <div className="service-info">
            <label className="fw-bold ">Price:</label>
            <span>{item.price}</span>
          </div>
          <div className="service-info">
            <label className="fw-bold">Doctor:</label>
            <span>{item.doctor}</span>
          </div>
          <div className="service-info">
            <label className="fw-bold m-2">Hospital:</label>
            <span>{item.hospital}</span>
          </div>
          <div className="service-info">
            <label className="fw-bold">Description:</label>
            <span>{item.description}</span>
          </div>
          <div>
            <Link
              to="/Main/Appointments"
              className="cta-button m-2"
              onClick={() =>
                setSelectService({
                  hospital: item.hospital,
                  doctor: item.doctor,
                  service: item.service,
                })
              }
            >
              Get Service
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  const renderCategories = () => {
    const categories = [...new Set(servicesData.map((item) => item.category))];

    return categories.map((category, index) => (
      <button
        key={index}
        onClick={() => handleCategoryClick(category)}
        className={`btn btn-outline-primary ${
          selectedCategory === category ? "active" : ""
        }`}
      >
        {category}
      </button>
    ));
  };

  return (
    <>
      <section className="hero-section ">
        <div className="cta-container text-center ">
          <h1 className="text-success mt-5">Welcome to Our Medical Services</h1>
          <p className="text-primary">Your health is our priority. Schedule an appointment today.</p>
        </div>
      </section>
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <div>
            <input
              type="search"
              id="searchbar"
              className="form-control mx-auto m-4"
              placeholder="🔍 Search by Hospital"
              value={searchQuery}
              onChange={handleSearch}
            />
            
            </div>

            <div className="category-buttons d-flex justify-content-center mb-3">
              {renderCategories()}
            </div>
            <div className="service-card-container">
              {noResults ? (
                <div className="text-center">No services found.</div>
              ) : (
                renderServices()
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
