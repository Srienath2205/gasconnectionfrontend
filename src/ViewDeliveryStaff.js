import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  DropdownDivider,
  Container,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./App2.css";

function ViewDeliveryStaff() {
  const navigate = useNavigate();
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedStaff, setUpdatedStaff] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8787/adminside/deliveryStaffs")
      .then((res) => {
        setDeliveryStaff(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        alert("Failed to load delivery staff. Please try again later.");
      });
  }, []);

  const handleUpdate = (staff) => {
    setSelectedStaff(staff);
    setUpdatedStaff({
      staffName: staff.staffName,
      phoneNumber: staff.phoneNumber,
      assignedArea: staff.assignedArea,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8787/adminside/updatedeliveryStaff", {
        ...selectedStaff,
        ...updatedStaff,
      })
      .then(() => {
        setDeliveryStaff(
          deliveryStaff.map((staff) =>
            staff.staffID === selectedStaff.staffID
              ? { ...staff, ...updatedStaff }
              : staff
          )
        );
        setShowUpdateModal(false);
      })
      .catch((err) => {
        console.error("Error updating staff:", err);
        alert("Failed to update delivery staff. Please try again later.");
      });
  };

  const handleDelete = (staffID) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      axios
        .delete(`http://localhost:8787/adminside/deletedeliveryStaff/${staffID}`)
        .then(() => {
          setDeliveryStaff(
            deliveryStaff.filter((staff) => staff.staffID !== staffID)
          );
        })
        .catch((err) => {
          console.error("Error deleting staff:", err);
          alert("Failed to delete delivery staff. Please try again later.");
        });
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

      <div className="container" id="deliveryStaff">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">View Delivery Staff</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Assigned Area</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveryStaff.length > 0 ? (
                      deliveryStaff.map((staff) => (
                        <tr key={staff.staffID}>
                          <td>{staff.staffID}</td>
                          <td>{staff.staffName}</td>
                          <td>{staff.phoneNumber}</td>
                          <td>{staff.assignedArea}</td>
                          <td>
                            <Button
                              variant="warning"
                              onClick={() => handleUpdate(staff)}
                            >
                              Update
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleDelete(staff.staffID)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {selectedStaff && (
        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Delivery Staff</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="formStaffName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={updatedStaff.staffName}
                  onChange={(e) =>
                    setUpdatedStaff({
                      ...updatedStaff,
                      staffName: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={updatedStaff.phoneNumber}
                  onChange={(e) =>
                    setUpdatedStaff({
                      ...updatedStaff,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAssignedArea">
                <Form.Label>Assigned Area</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter assigned area"
                  value={updatedStaff.assignedArea}
                  onChange={(e) =>
                    setUpdatedStaff({
                      ...updatedStaff,
                      assignedArea: e.target.value,
                    })
                  }
                  required
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default ViewDeliveryStaff;

