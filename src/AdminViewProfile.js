import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  DropdownDivider,
  Card,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./CustomerLogin.css";

function AdminViewProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = "Sri003@gmail.com;";
        const response = await axios.get(
          `http://localhost:8787/adminside/admin/email/${email}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

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

      <div className="containerlogin">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card>
              <Card.Body>
                <h2 className="card-title">View Profile</h2>
                {error && <p className="text-danger">{error}</p>}
                <Card.Text>
                  <strong>Email:</strong> {profile.email}
                  <br />
                  <strong>Password:</strong> {profile.password}
                </Card.Text>
                <Link to="/edit-admin">
                  <Button className="btnlogin btnlogin-primary">
                    Edit Profile
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminViewProfile;
