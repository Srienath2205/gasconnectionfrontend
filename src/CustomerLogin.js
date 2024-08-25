import React, { useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function CustomerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("password", password);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
 

    await axios
      .get(
        `http://localhost:8787/customerside/customer/${data.get(
          "email"
        )}/${data.get("password")}`
      )
      .then((res) => {
        if (res.data) {
          console.log(email);
          console.log(password);
          console.log(res.data);
          sessionStorage.setItem("email", res.data.email);
          // sessionStorage.setItem("userPassword", res.data("userPassword"));
          sessionStorage.setItem("customerID", res.data.customerID);

          navigate("/customer-home");
        } else {
             alert("Login Failed");
        }
      })
      .catch((err) => console.log(err));
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
            Online Gas Booking System
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
      <div className="containerlogin">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Log in to your account</h2>


                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      required
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  <button
                    type="submit"
                    name="Sign in"
                    className="btnlogin btnlogin-primary"
                  >
                    Sign in
                  </button>
                </form>

                <p className="text-center mt-4">
                  Don't have an account?{" "}
                  <Link to="/customer-register">
                    <button className="btton btton-secondary">Sign Up</button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerLogin;
