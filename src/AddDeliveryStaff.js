import axios from "axios";
import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  DropdownDivider,
  Container,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./App2.css";

function AddDeliveryStaff() {
  const [inputData, setInputData] = useState({
    staffName: "",
    phoneNumber: "",
    assignedArea: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validateValues(inputData);

    if (result === true) {
      const dataToSend = {
        ...inputData,
      };

      axios
        .post("http://localhost:8787/adminside/adddeliveryStaff", dataToSend, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          alert("Delivery staff added successfully!");
          navigate("/view-staff");
        })
        .catch((err) => {
          if (err.response) {
            console.error("Error data:", err.response.data);
            console.error("Error status:", err.response.status);
            alert("Failed to add delivery staff: " + err.response.data);
          } else if (err.request) {
            console.error("Error request:", err.request);
            alert("No response from server. Please try again later.");
          } else {
            console.error("Error message:", err.message);
            alert("An unexpected error occurred: " + err.message);
          }
        });
    } else {
      alert("Please enter valid inputs!");
    }
  };

  const validateValues = (inputData) => {
    if (!inputData.staffName) {
      alert("Please enter staff name!");
      return false;
    } else if (!inputData.phoneNumber) {
      alert("Please enter phone number!");
      return false;
    } else if (!inputData.assignedArea) {
      alert("Please enter assigned area!");
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <Navbar expand="lg" id="home" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            href="#home"
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
              <Link to="/admin-home">
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
            <Nav id="nav5">
              <NavDropdown title="Connections" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/adminview-connections">
                    <button id="homebutton">View Connections</button>
                  </Link>
                </NavDropdown.Item>
                <DropdownDivider />
                <NavDropdown.Item id="homeback">
                  <Link to="/connection-distribution">
                    <button id="homebutton">New Connection</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Bookings" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/adminbooking">
                    <button id="homebutton">View Bookings</button>
                  </Link>
                </NavDropdown.Item>
                <DropdownDivider />
                <NavDropdown.Item id="homeback">
                  <Link to="/view-staff">
                    <button id="homebutton">View Delivery Staffs</button>
                  </Link>
                </NavDropdown.Item>
                <DropdownDivider />
                <NavDropdown.Item id="homeback">
                  <Link to="/add-staff">
                    <button id="homebutton">Add Delivery Staffs</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav3">
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
            <Nav id="nav2">
              <NavDropdown
                title={<FaUserCircle className="text-2xl" />}
                id="basic-nav-dropdown"
                className="text-white"
              >
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/view-admin")}
                >
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as="button"
                  onClick={() => navigate("/edit-admin")}
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
      <div className="container" id="deliveryStaff">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Add Delivery Staff</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="staffName">Staff Name:</label>
                    <input
                      type="text"
                      id="staffName"
                      name="staffName"
                      className="form-control"
                      value={inputData.staffName}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          staffName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={inputData.phoneNumber}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="assignedArea">Assigned Area:</label>
                    <input
                      type="text"
                      id="assignedArea"
                      name="assignedArea"
                      className="form-control"
                      value={inputData.assignedArea}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          assignedArea: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Staff
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/view-staff")}
                  >
                    View Staff
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDeliveryStaff;
