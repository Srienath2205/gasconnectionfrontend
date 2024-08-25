import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Navbar, Container, Modal, Nav, NavDropdown, DropdownDivider, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './App2.css';

function AdminViewConnections() {
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  useEffect(() => {
    // Fetch all connections
    axios.get("http://localhost:8787/customerside/connections")
      .then(response => setConnections(response.data))
      .catch(error => {
        console.error(error);
        setError('Failed to load connections.');
      });

    // Fetch distinct locations
    axios.get("http://localhost:8787/customerside/locations")
      .then(response => setLocations(response.data))
      .catch(error => {
        console.error(error);
        setError('Failed to load locations.');
      });
  }, []);

  const handleViewInfo = (connection) => {
    setSelectedConnection(connection);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8787/adminside/deleteconnection/${id}`)
      .then(() => {
        setConnections(connections.filter(conn => conn.id !== id));
        setSelectedConnection(null);
        setError('Connection deleted successfully.');
      })
      .catch(error => {
        console.error(error);
        setError('Failed to delete connection.');
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConnection(null);
  };

  // Filter connections by selected location
  const filteredConnections = selectedLocation === 'All'
    ? connections
    : connections.filter(connection => connection.location === selectedLocation);

  return (
    <>
      <Navbar expand="lg" id="home" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home" className='text-light' style={{ fontSize: "25px", fontFamily: "verdana", fontWeight: "bold", fontStyle: "italic" }}>
            LPG Connect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav0">
              <Link to="/admin-home"><Button id="button2" style={{ fontSize: '12px', fontFamily: 'verdana', fontWeight: 'bold' }}>Home</Button></Link>
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
                <input className="form-control" type="search" placeholder="Search" aria-label="Search" id="search" style={{ fontSize: "15px", textDecoration: "none" }} />
                <button className="btn" id="button2" type="submit" style={{ fontSize: "20px", textDecoration: "none" }}>Search</button>
              </form>
            </Nav>
            <Nav id="nav4">
              <NavDropdown title={<FaUserCircle className="text-2xl" />} id="basic-nav-dropdown" className="text-white">
                <NavDropdown.Item as="button" onClick={() => navigate('/view-admin')}>View Profile</NavDropdown.Item>
                <NavDropdown.Item as="button" onClick={() => navigate('/edit-admin')}>Edit Profile</NavDropdown.Item>
                <NavDropdown.Item as="button" onClick={() => navigate('/')}>Log Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-container">
        <Container>
          <Row>
            <Col>
              <center>
                <h2 className="distribution-title" style={{ marginTop: "30px", fontSize: "25px", fontFamily: "verdana", fontWeight: "bold", fontStyle: "italic" }}>Manage Gas Connections</h2>
              </center>
            </Col>
          </Row>

          <br />
          <Row>
            <Col>
              <Link to="/connection-distribution" style={{ marginLeft: "1250px" }}><Button variant="primary">Add Connection</Button></Link>
            </Col>
          </Row>

          <br />

          {error && <div className="error-message">{error}</div>}

          {/* Location filter dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedLocation}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedLocation('All')}>All</Dropdown.Item>
              {locations.map(location => (
                <Dropdown.Item key={location} onClick={() => setSelectedLocation(location)}>
                  {location}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />

          <Row>
            {filteredConnections.length === 0 ? (
              <center>
                <Col>
                  <p className="distribution-title" style={{ marginTop: "80px", fontSize: "25px", fontFamily: "verdana", fontWeight: "bold", fontStyle: "italic" }}>No connections available.</p>
                </Col>
              </center>
            ) : (
              filteredConnections.map((connection) => (
                <Col xs={12} sm={6} md={4} key={connection.id} className="grid-item">
                  <Card className="connection-card">
                    {connection.cropsImage && (
                      <Card.Img
                        variant="top"
                        src={`data:image/jpeg;base64,${connection.cropsImage}`}
                        alt={connection.name}
                        className="connection-image"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{connection.name}</Card.Title>
                      <Card.Text>
                        <center><strong>Location:</strong> {connection.location}</center>
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleViewInfo(connection)}
                        className="me-2"
                      >
                        View Info
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(connection.id)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Container>

        {/* View Info Modal */}
        {selectedConnection && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedConnection.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>Description:</strong> {selectedConnection.description}</p>
              <p><strong>Ratings:</strong> {selectedConnection.ratings}</p>
              <p><strong>Reviews:</strong> {selectedConnection.reviews}</p>
              <p><strong>Location:</strong> {selectedConnection.location}</p>
              {selectedConnection.cropsImage && (
                <img
                  src={`data:image/jpeg;base64,${selectedConnection.cropsImage}`}
                  alt={selectedConnection.name}
                  className="modal-image"
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
}

export default AdminViewConnections;







