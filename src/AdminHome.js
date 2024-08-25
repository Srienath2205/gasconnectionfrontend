import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  DropdownDivider,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./App2.css";
import "./AdminHome.css";

function AdminHome() {
  const navigate = useNavigate();

  const [pending, setPending] = useState(0);
  const [approve, setApprove] = useState(0);
  const [reject, setReject] = useState(0);

  useEffect(() => {
    loadPending();
    loadApproved();
    loadRejected();
  }, []);

  const loadPending = () => {
    axios
      .get("http://localhost:8787/requestside/getpendingCount")
      .then((res) => setPending(res.data))
      .catch((err) => console.log(err));
  };

  const loadApproved = () => {
    axios
      .get("http://localhost:8787/requestside/getapproveCount")
      .then((res) => setApprove(res.data))
      .catch((err) => console.log(err));
  };

  const loadRejected = () => {
    axios
      .get("http://localhost:8787/requestside/getrejectedCount")
      .then((res) => setReject(res.data))
      .catch((err) => console.log(err));
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
            <Nav id="nav1">
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

      <div className="text-block">
        <center>
          <h1
            style={{
              marginTop: "50px",
              fontSize: "25px",
              fontFamily: "verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Admin Home
          </h1>
        </center>
        <br />
        <center>
          <p
            style={{
              fontSize: "25px",
              fontStyle: "italic",
              textDecoration: "none",
            }}
          >
            Welcome to your admin account.
          </p>
        </center>
        <center>
          <p
            style={{
              fontSize: "25px",
              fontStyle: "italic",
              textDecoration: "none",
            }}
          >
            Here you can manage customers, delivery staffs, connections and
            bookings.
          </p>
        </center>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Link
            to="/adminview-connections"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              fontStyle: "italic",
              color: "white",
            }}
          >
            <button id="button">View Connections</button>
          </Link>
          <Link
            to="/view-staff"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              fontStyle: "italic",
              color: "white",
              marginLeft: "10px",
            }}
          >
            <button id="button">View Staffs</button>
          </Link>
          <Link
            to="/adminbooking"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              fontStyle: "italic",
              color: "white",
              marginLeft: "20px",
            }}
          >
            <button id="button">View Bookings</button>
          </Link>
          <Link
            to="/view-requests"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              fontStyle: "italic",
              color: "white",
              marginLeft: "10px",
            }}
          >
            <button id="button">Connection Request</button>
          </Link>
        </div>
      </div>

      {/* Cards Section */}
      <div
        className="Containers"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="row" id="row">
          <div className="col-6 col-sm-3">
            <div className="card" id="card-color">
              <div className="card-inner">
                <Link className="link" to={`/pendingrequest`} id="pending">
                  <h3>
                    PENDING <br />
                    REQUESTS
                  </h3>
                </Link>
              </div>
              <h1>{pending}</h1>
            </div>
          </div>

          <div className="col-6 col-sm-3">
            <div className="card" id="card-color">
              <div className="card-inner">
                <Link className="link" to={`/approvedrequest`} id="approved">
                  <h3>APPROVED REQUESTS</h3>
                </Link>
              </div>
              <h1>{approve}</h1>
            </div>
          </div>

          <div className="col-6 col-sm-3">
            <div className="card" id="card-color">
              <div className="card-inner">
                <Link className="link" to={`/rejectedrequest`} id="rejected">
                  <h3>REJECTED REQUESTS</h3>
                </Link>
              </div>
              <h1>{reject}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
