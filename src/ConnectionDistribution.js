import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
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
import "./App2.css";

function ConnectionDistribution() {
  const [connections, setConnections] = useState([]);
  const [newConnection, setNewConnection] = useState({
    name: "",
    description: "",
    image: null,
    ratings: 0,
    reviews: "",
    location: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddConnection = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewConnection({ ...newConnection, [name]: value });
  };

  const handleFileChange = (event) => {
    setNewConnection({ ...newConnection, image: event.target.files[0] });
  };

  const handleAddConnectionSubmit = (event) => {
    event.preventDefault();

    if (!newConnection.image) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newConnection.name);
    formData.append("description", newConnection.description);
    formData.append("ratings", newConnection.ratings);
    formData.append("reviews", newConnection.reviews);
    formData.append("location", newConnection.location);
    formData.append("cropsImage", newConnection.image);

    axios
      .post("http://localhost:8787/adminside/addconnection", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setConnections([...connections, response.data]);
        setNewConnection({
          name: "",
          description: "",
          image: null,
          ratings: 0,
          reviews: "",
          location: "",
        });
        setShowAddForm(false);
        alert("Details added successfully!");
        navigate("/adminview-connections");
      })
      .catch((error) => {
        console.error("There was an error adding the connection!", error);
        setError("Failed to add connection. Please try again.");
      });
  };

  return (
    <>
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

      <div className="main-container">
        <div className="content">
          <Row>
            <Col>
              <center>
                <h2
                  className="distribution-title"
                  style={{
                    marginTop: "30px",
                    fontSize: "25px",
                    fontFamily: "verdana",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Add New Connections
                </h2>
              </center>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <Button
                variant="primary"
                onClick={handleAddConnection}
                style={{ marginLeft: "1450px" }}
              >
                Add Connection
              </Button>
            </Col>
          </Row>
          <br />
          {showAddForm && (
            <Row className="justify-content-center">
              <Col xs={12} sm={10} md={8} lg={6}>
                <div className="form-container">
                  <Card className="card">
                    <Card.Body>
                      <Card.Title>Connection Details</Card.Title>
                      <Form onSubmit={handleAddConnectionSubmit}>
                        <Form.Group controlId="name">
                          <Form.Label>Company Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={newConnection.name}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="description"
                            value={newConnection.description}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="image">
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                            type="file"
                            name="cropsImage"
                            onChange={handleFileChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="ratings">
                          <Form.Label>Ratings</Form.Label>
                          <Form.Control
                            type="number"
                            name="ratings"
                            value={newConnection.ratings}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="reviews">
                          <Form.Label>Reviews</Form.Label>
                          <Form.Control
                            type="text"
                            name="reviews"
                            value={newConnection.reviews}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="location">
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            value={newConnection.location}
                            onChange={handleInputChange}
                          />
                        </Form.Group>
                        <br />
                        <Button variant="primary" type="submit">
                          Add Connection
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="secondary" onClick={handleCancelAdd}>
                          Cancel
                        </Button>
                      </Form>
                      {error && <div className="error-message">{error}</div>}
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default ConnectionDistribution;
