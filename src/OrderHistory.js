import React, { useEffect, useState } from "react";
import axios from "axios";
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

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8787/bookingside/bookings")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the order history!", error);
      });
  };

  const handleCancel = (bookingID) => {
    axios
      .delete(`http://localhost:8787/bookingside/deletebooking/${bookingID}`)
      .then((response) => {
        if (response.data === "Success") {
          setOrders(orders.filter((order) => order.bookingID !== bookingID));
        } else {
          console.error("Failed to cancel the booking");
        }
      })
      .catch((error) => {
        console.error("There was an error canceling the booking!", error);
      });
  };

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

      <h2 className="card-title">Order History</h2>
      <table className="table border shadow table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ padding: "20px" }}>
              Order ID
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Customer ID
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Cylinders Required
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Status
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Booking Date
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Amount
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Delivery Staff
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Delivery Date
            </th>
            <th scope="col" style={{ padding: "20px" }}>
              Connection ID
            </th>{" "}
            <th scope="col" style={{ padding: "20px" }}>
              Action
            </th>{" "}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.bookingID}>
              <td style={{ padding: "20px" }}>{order.bookingID}</td>
              <td style={{ padding: "20px" }}>
                {order.customer ? order.customer.customerID : "N/A"}
              </td>{" "}
              <td style={{ padding: "20px" }}>{order.cylindersRequired}</td>
              <td style={{ padding: "20px" }}>{order.status}</td>
              <td style={{ padding: "20px" }}>
                {new Date(order.bookingDate).toLocaleDateString()}
              </td>
              <td style={{ padding: "20px" }}>₹{order.amount}</td>
              <td style={{ padding: "20px" }}>
                {order.deliverystaff ? order.deliverystaff.staffName : "N/A"}
              </td>
              <td style={{ padding: "20px" }}>
                {order.deliveryDate
                  ? new Date(order.deliveryDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td style={{ padding: "20px" }}>
                {order.connectionRequest
                  ? order.connectionRequest.connectionID
                  : "N/A"}{" "}
              </td>
              <td style={{ padding: "20px" }}>
                <Button
                  className="btn-danger"
                  onClick={() => handleCancel(order.bookingID)}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
