import axios from "axios";
import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerRegister.css";

function CustomerRegister() {
  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validateValues(inputData);

    if (result === true) {
      console.log("Sending data:", inputData);

      axios
        .post("http://localhost:8787/customerside/addcustomer", inputData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          alert("Registered Successfully !!!");
          navigate("/customer-login");
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response) {
            console.error("Error data:", err.response.data);
            console.error("Error status:", err.response.status);
            console.error("Error headers:", err.response.headers);
            alert("Registration failed: " + err.response.data);
          } else if (err.request) {
            console.error("Error request:", err.request);
            alert("No response from server. Please try again later.");
          } else {
            console.error("Error message:", err.message);
            alert("An unexpected error occurred: " + err.message);
          }
        });
    } else {
      alert("Please Enter Valid Inputs!!!");
    }
  };

  const validateValues = (inputData) => {
    if (!inputData.username) {
      alert("Please enter username !!!");
      return false;
    } else if (!inputData.email) {
      alert("Please enter email !!!");
      return false;
    } else if (!inputData.password) {
      alert("Please enter password !!!");
      return false;
    } else if (!inputData.phoneNumber) {
      alert("Please enter phone number !!!");
      return false;
    } else {
      return true;
    }
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
            <Nav id="nav1">
              <Link to="/">
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
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/admin-login">
                    <Button id="homebutton">Login</Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav2">
              <NavDropdown title="Customer" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/customer-register">
                    <Button id="homebutton">Register</Button>
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item id="homeback">
                  <Link to="/customer-login">
                    <Button id="homebutton">Login</Button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="containersign">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Customer Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      value={inputData.username}
                      onChange={(e) =>
                        setInputData({ ...inputData, username: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={inputData.email}
                      onChange={(e) =>
                        setInputData({ ...inputData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={inputData.password}
                      onChange={(e) =>
                        setInputData({ ...inputData, password: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="form-control"
                      value={inputData.phoneNumber}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <button type="submit" className="btton btton-primary">
                    Register
                  </button>
                  <p>Already have an account?</p>
                  <Link to={"/customer-login"}>
                    <button type="button" className="btton btton-secondary">
                      Sign In
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRegister;
