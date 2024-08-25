import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function ApprovedRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const customerID = sessionStorage.getItem("customerID");

  useEffect(() => {
    loadApprovedRequests();
  }, []);

  const loadApprovedRequests = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8787/requestside/getApprovedRequestList"
      );
      setRequests(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching approved requests:", error);
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
            <Nav id="nav0">
              <NavLink to="/admin-home">
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
              </NavLink>
            </Nav>
            <Nav id="nav5">
              <NavDropdown title="Connections" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <NavLink to="/adminview-connections">
                    <button id="homebutton">View Connections</button>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item id="homeback">
                  <NavLink to="/connection-distribution">
                    <button id="homebutton">New Connection</button>
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Bookings" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <NavLink to="/adminbooking">
                    <button id="homebutton">View Bookings</button>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item id="homeback">
                  <NavLink to="/view-staff">
                    <button id="homebutton">View Delivery Staffs</button>
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item id="homeback">
                  <NavLink to="/add-staff">
                    <button id="homebutton">Add Delivery Staffs</button>
                  </NavLink>
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
                  style={{ fontSize: "15px" }}
                />
                <button
                  className="btn"
                  id="button2"
                  type="submit"
                  style={{ fontSize: "20px" }}
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

      <center>
        <h2 className="distribution-title">Approved Connection Requests</h2>
      </center>
      <div
        className="table-container"
        style={{ width: "80%", maxWidth: "800px", marginLeft: "350px" }}
      >
        {requests.length === 0 ? (
          <h4>No Approved Requests!</h4>
        ) : (
          <table className="table border shadow table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Request ID</th>
                <th scope="col">Customer ID</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Address</th>
                <th scope="col">Gender</th>
                <th scope="col">Aadhar Number</th>
                <th scope="col">Pan Number</th>
                <th scope="col">Status</th>
                <th scope="col">Connection Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.connectionID}>
                  <td>{request.connectionID}</td>
                  <td>{request.customer.customerID}</td>
                  <td>{new Date(request.dateOfBirth).toLocaleDateString()}</td>
                  <td>{request.address}</td>
                  <td>{request.gender}</td>
                  <td>{request.aadharNumber}</td>
                  <td>{request.panNumber}</td>
                  <td>{request.status}</td>
                  <td>
                    {new Date(request.connectionDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
