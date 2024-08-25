import React, { useEffect, useState } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  DropdownDivider,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const PendingRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8787/requestside/getPendingRequestList")
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the pending requests!",
          error
        );
      });
  }, []);

  const handleApprove = (connectionID) => {
    axios
      .put(`http://localhost:8787/requestside/updaterequest/${connectionID}`)
      .then((response) => {
        setRequests(
          requests.filter((req) => req.connectionID !== connectionID)
        );
      })
      .catch((error) => {
        console.error("There was an error approving the request!", error);
      });
  };

  const handleReject = (connectionID) => {
    axios
      .put(`http://localhost:8787/requestside/rejectrequest/${connectionID}`)
      .then((response) => {
        setRequests(
          requests.filter((req) => req.connectionID !== connectionID)
        );
      })
      .catch((error) => {
        console.error("There was an error rejecting the request!", error);
      });
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

      <h2 className="card-title">Pending Connection Requests</h2>
      <table className="table border shadow table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ padding: "20px" }}>
              Request ID
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Customer ID
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Date of Birth
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Address
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Gender
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Aadhar Number
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Pan Number
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Status
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Connection Date
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.connectionID}>
              <td style={{ padding: "20px" }}>{request.connectionID}</td>
              <td style={{ padding: "20px" }}>{request.customer.customerID}</td>
              <td style={{ padding: "20px" }}>
                {new Date(request.dateOfBirth).toLocaleDateString()}
              </td>
              <td style={{ padding: "20px" }}>{request.address}</td>
              <td style={{ padding: "20px" }}>{request.gender}</td>
              <td style={{ padding: "20px" }}>{request.aadharNumber}</td>
              <td style={{ padding: "20px" }}>{request.panNumber}</td>
              <td style={{ padding: "20px" }}>{request.status}</td>
              <td style={{ padding: "20px" }}>
                {new Date(request.connectionDate).toLocaleDateString()}
              </td>
              <td>
                <button
                  onClick={() => handleApprove(request.connectionID)}
                  className="btton btton-primary"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.connectionID)}
                  className="btton btton-secondary"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRequests;
