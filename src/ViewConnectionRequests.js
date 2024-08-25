import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

export default function AllRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const customerID = sessionStorage.getItem("customerID");

  const loadAllRequests = useCallback(async () => {
    try {
      
      const result = await axios.get(
        `http://localhost:8787/requestside/getConnectionRequests`
      );

      if (Array.isArray(result.data)) {
        setRequests(result.data);
      } else {
        console.error("Expected an array but got:", result.data);
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching all requests:", error);
      setError("Error fetching requests."); 
    }
  }, [customerID]);

  useEffect(() => {
    loadAllRequests();
  }, [loadAllRequests]);

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

      <center>
        <h2 className="distribution-title">Connection Requests</h2>
      </center>
      <div
        className="table-container"
        style={{ width: "80%", maxWidth: "800px", marginLeft: "400px" }}
      >
        {error ? (
          <h4>{error}</h4>
        ) : requests.length === 0 ? (
          <h4>No Requests Found!</h4>
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
