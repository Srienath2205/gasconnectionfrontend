import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import moment from "moment-timezone";
import "./CylinderBookingForm.css";

function CylinderBookingForm() {
  const [inputData, setInputData] = useState({
    cylindersRequired: "",
    status: "Ordered",
    bookingDate: "",
    paymentMethod: "",
    connectionID: "",
    customerID: "",
    amount: "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [approvedConnections, setApprovedConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedConnections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8787/requestside/getApprovedRequestList"
        );
        setApprovedConnections(response.data);
      } catch (err) {
        console.error("Failed to fetch approved connections", err);
      }
    };

    fetchApprovedConnections();
  }, []);

  const getCurrentDate = () => {
    return moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const customerID = sessionStorage.getItem("customerID");
    if (!customerID) {
      alert("Customer ID not found in session storage.");
      return;
    }

    const currentDate = getCurrentDate();
    const bookingData = {
      ...inputData,
      customerID,
      bookingDate: currentDate,
      amount: inputData.cylindersRequired * 780,
    };

    let result = validateValues(bookingData);
    if (result === true) {
      try {
        const response = await axios.post(
          "http://localhost:8787/bookingside/addbooking",
          {
            cylindersRequired: bookingData.cylindersRequired,
            status: bookingData.status,
            bookingDate: bookingData.bookingDate,
            connectionRequest: { connectionID: bookingData.connectionID },
            customer: { customerID: bookingData.customerID },
            amount: bookingData.amount,
          }
        );

        setShowPaymentForm(true); 
      } catch (err) {
        console.log(err);
        alert("Failed to create booking. Please try again.");
      }
    } else {
      alert("Please enter valid inputs!");
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    let result = validatePayment(inputData);

    if (result === true) {
      
      alert("Booking and Payment successful!");
      navigate("/orderhistory");
    } else {
      alert("Please enter valid payment details!");
    }
  };

  const validateValues = (data) => {
    if (!data.cylindersRequired) {
      alert("Please enter cylinders required!");
      return false;
    }

    if (!data.connectionID) {
      alert("Please select a connection request!");
      return false;
    }

    return true;
  };

  const validatePayment = (data) => {
    const {
      paymentMethod,
      cardNumber,
      cardholderName,
      expiryDate,
      cvv,
      bankName,
      accountNumber,
      ifscCode,
    } = data;

    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
      if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return false;
      }

      if (!cardholderName) {
        alert("Cardholder name is required.");
        return false;
      }

      if (!expiryDate || new Date(expiryDate) < new Date()) {
        alert("Please enter a valid expiry date that is in the future.");
        return false;
      }

      if (!cvv || !/^\d{3}$/.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return false;
      }
    }

    if (paymentMethod === "Internet Banking") {
      if (!bankName) {
        alert("Bank name is required.");
        return false;
      }

      if (!accountNumber || !/^\d{10,12}$/.test(accountNumber)) {
        alert("Please enter a valid account number (10-12 digits).");
        return false;
      }

      if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        alert("Please enter a valid IFSC code (usually 11 characters).");
        return false;
      }
    }

    return true;
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

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="container shadow">
              <h1>Cylinder Booking</h1>
              <form onSubmit={handleBookingSubmit}>
                <div>
                  <label htmlFor="cylindersRequired">Cylinders Required:</label>
                  <input
                    type="number"
                    name="cylindersRequired"
                    className="form-control"
                    value={inputData.cylindersRequired}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInputData((prevData) => ({
                        ...prevData,
                        cylindersRequired: value,
                        amount: value * 780,
                      }));
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="amount">Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    className="form-control"
                    value={inputData.amount}
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="connectionID">
                    Select Connection Request:
                  </label>
                  <select
                    name="connectionID"
                    className="form-control"
                    value={inputData.connectionID}
                    onChange={(e) =>
                      setInputData((prevData) => ({
                        ...prevData,
                        connectionID: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select Connection</option>
                    {approvedConnections.map((connection) => (
                      <option
                        key={connection.connectionID}
                        value={connection.connectionID}
                      >
                        {connection.connectionID} {connection.customerName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="status">Status:</label>
                  <input
                    type="text"
                    name="status"
                    className="form-control"
                    value={inputData.status}
                    readOnly
                  />
                </div>

                <br />
                <button className="btn btn-info" type="submit">
                  Submit Booking
                </button>
              </form>

              {showPaymentForm && (
                <div className="payment-form">
                  <h1>Payment Details</h1>
                  <form onSubmit={handlePaymentSubmit}>
                    <div>
                      <label htmlFor="paymentMethod">Payment Method:</label>
                      <select
                        name="paymentMethod"
                        className="form-control"
                        value={inputData.paymentMethod}
                        onChange={(e) =>
                          setInputData((prevData) => ({
                            ...prevData,
                            paymentMethod: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Internet Banking">
                          Internet Banking
                        </option>
                      </select>
                    </div>

                    {inputData.paymentMethod === "Credit Card" ||
                    inputData.paymentMethod === "Debit Card" ? (
                      <div>
                        <div>
                          <label htmlFor="cardNumber">Card Number:</label>
                          <input
                            type="text"
                            name="cardNumber"
                            className="form-control"
                            value={inputData.cardNumber}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                cardNumber: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="cardholderName">
                            Cardholder Name:
                          </label>
                          <input
                            type="text"
                            name="cardholderName"
                            className="form-control"
                            value={inputData.cardholderName}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                cardholderName: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="expiryDate">Expiry Date:</label>
                          <input
                            type="date"
                            name="expiryDate"
                            className="form-control"
                            value={inputData.expiryDate}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                expiryDate: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv">CVV:</label>
                          <input
                            type="text"
                            name="cvv"
                            className="form-control"
                            value={inputData.cvv}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                cvv: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    ) : inputData.paymentMethod === "Internet Banking" ? (
                      <div>
                        <div>
                          <label htmlFor="bankName">Bank Name:</label>
                          <input
                            type="text"
                            name="bankName"
                            className="form-control"
                            value={inputData.bankName}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                bankName: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="accountNumber">Account Number:</label>
                          <input
                            type="text"
                            name="accountNumber"
                            className="form-control"
                            value={inputData.accountNumber}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                accountNumber: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <label htmlFor="ifscCode">IFSC Code:</label>
                          <input
                            type="text"
                            name="ifscCode"
                            className="form-control"
                            value={inputData.ifscCode}
                            onChange={(e) =>
                              setInputData((prevData) => ({
                                ...prevData,
                                ifscCode: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    ) : null}

                    <br />
                    <button className="btn btn-info" type="submit">
                      Submit Payment
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CylinderBookingForm;
