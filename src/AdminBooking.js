import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  DropdownDivider,
  Modal,
  Form,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./AdminBooking.css"; 

const AdminBooking = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [deliveryStaff, setDeliveryStaff] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to handle selected order
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchDeliveryStaff();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8787/bookingside/bookings")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const fetchDeliveryStaff = () => {
    axios
      .get("http://localhost:8787/adminside/deliveryStaffs")
      .then((response) => setDeliveryStaff(response.data))
      .catch((error) => console.error("Error fetching delivery staff:", error));
  };

  const handleShow = (order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  const handleClose = () => setModalShow(false);

  const handleUpdate = () => {
    if (!selectedOrder) return;

    axios
      .put("http://localhost:8787/bookingside/updatebooking", selectedOrder)
      .then((response) => {
        console.log(response.data);
        handleClose();
        alert("Delivery details updated successfully");
        fetchOrders(); // Refresh orders list after update
      })
      .catch((error) =>
        console.error("Error updating delivery details:", error)
      );
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

      <h2 className="card-title">Order History</h2>
      <table className="table border shadow table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer ID</th>
            <th scope="col">Cylinders Required</th>
            <th scope="col">Status</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Delivery Staff</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Connection ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.bookingID}>
              <td>{order.bookingID}</td>
              <td>{order.customer ? order.customer.customerID : "N/A"}</td>
              <td>{order.cylindersRequired}</td>
              <td>{order.status}</td>
              <td>
                {order.bookingDate
                  ? new Date(order.bookingDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>₹{order.amount}</td>
              <td>
                {order.deliverystaff ? order.deliverystaff.staffName : "N/A"}
              </td>
              <td>
                {order.deliveryDate
                  ? new Date(order.deliveryDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {order.connectionRequest
                  ? order.connectionRequest.connectionID
                  : "N/A"}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleShow(order)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating order details */}
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Form>
              <Form.Group controlId="formOrderID">
                <Form.Label>Order ID</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.bookingID}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formCustomerID">
                <Form.Label>Customer ID</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    selectedOrder.customer
                      ? selectedOrder.customer.customerID
                      : "N/A"
                  }
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formCylindersRequired">
                <Form.Label>Cylinders Required</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.cylindersRequired}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedOrder.status}
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Ordered">Ordered</option>
                  <option value="Assigned">Assigned</option>
                  <option value="Delivered">Delivered</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDeliveryDate">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control
                  type="date"
                  value={
                    selectedOrder.deliveryDate
                      ? new Date(selectedOrder.deliveryDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      deliveryDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formStaff">
                <Form.Label>Assign Staff</Form.Label>
                <Form.Control
                  as="select"
                  value={
                    selectedOrder.deliverystaff
                      ? selectedOrder.deliverystaff.staffID
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedOrder({
                      ...selectedOrder,
                      deliverystaff: { staffID: e.target.value },
                    })
                  }
                >
                  <option value="">Select Staff</option>
                  {deliveryStaff.map((staff) => (
                    <option key={staff.staffID} value={staff.staffID}>
                      {staff.staffID} - {staff.staffName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminBooking;
