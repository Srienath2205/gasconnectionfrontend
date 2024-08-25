import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import moment from "moment-timezone";
import "./App2.css";

function ConnectionRequestForm() {
  const cusid = sessionStorage.getItem("customerID");
  console.log(cusid);

  const [inputData, setInputData] = useState({
    dateOfBirth: "",
    address: "",
    gender: "",
    aadharNumber: "",
    panNumber: "",
    status: "Requested",
    customer: {
      customerID: cusid,
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validateValues(inputData);

    if (result === true) {
      try {
        const connectionDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");

        await axios.post(
          "http://localhost:8787/requestside/addconnectionRequest",
          {
            ...inputData,
            connectionDate: connectionDate,
          }
        );

        alert("Connection request added successfully! Await admin approval.");
        navigate("/customer-home");
      } catch (err) {
        console.error("Error submitting connection request:", err);
        alert("Failed to submit connection request.");
      }
    } else {
      alert("Please Enter Valid Inputs!!!");
    }
  };

  const validateValues = (inputData) => {
    if (!inputData.dateOfBirth) {
      alert("Please enter date of birth.");
      return false;
    } else if (!inputData.address) {
      alert("Please enter address.");
      return false;
    } else if (!inputData.gender) {
      alert("Please select gender.");
      return false;
    } else if (!inputData.aadharNumber) {
      alert("Please enter Aadhar number.");
      return false;
    } else if (!inputData.panNumber) {
      alert("Please enter PAN number.");
      return false;
    }
    return true;
  };

  return (
    <div>
      <Navbar expand="lg" id="home" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            className="text-light"
            style={{
              fontSize: "25px",
              fontFamily: "verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            LPG Connect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav2">
              <Link to="/customer-home">
                <Button
                  id="button2"
                  style={{
                    fontSize: "12px",
                    fontFamily: "verdana",
                    fontWeight: "bold",
                  }}
                >
                  Home
                </Button>
              </Link>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Connections" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/view-connections">
                    <button id="homebutton">View Connections</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Bookings" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/orderhistory">
                    <button id="homebutton">View Bookings</button>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="homeback">
                  <Link to="/cylinder-booking">
                    <button id="homebutton">Add Booking</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav4">
              <form className="d-flex">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="search"
                  style={{ fontSize: "15px", textDecoration: "none" }}
                />
                <button
                  className="btn"
                  id="button2"
                  type="submit"
                  style={{ fontSize: "20px", textDecoration: "none" }}
                >
                  Search
                </button>
              </form>
            </Nav>
            <Nav id="nav4">
              <NavDropdown
                title={<FaUserCircle className="text-2xl" />}
                id="basic-nav-dropdown"
                className="text-white"
              >
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/cusprofile")}
                >
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/edit-cusprofile")}
                >
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item as="button" onClick={() => navigate("/")}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div id="body">
        <div
          id="add2"
          className="d-flex w-100 vh-100 justify-content-center align-items-center"
        >
          <div className="w-50 border p-5 rounded" id="addemp">
            <h1>Connection Request Form</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={inputData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={inputData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="gender">Gender:</label>
                <select
                  name="gender"
                  className="form-control"
                  value={inputData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="aadharNumber">Aadhar Number:</label>
                <input
                  type="text"
                  name="aadharNumber"
                  className="form-control"
                  value={inputData.aadharNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="panNumber">PAN Number:</label>
                <input
                  type="text"
                  name="panNumber"
                  className="form-control"
                  value={inputData.panNumber}
                  onChange={handleInputChange}
                />
              </div>

              <br />
              <button className="btn btn-info" type="submit">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionRequestForm;
