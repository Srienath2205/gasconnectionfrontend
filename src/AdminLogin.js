import React, { useState } from "react";
import axios from "axios";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", email, password);

    try {
      const response = await axios.get(
        `http://localhost:8787/adminside/admin/email/${email}`
      );
      const userData = response.data;
      console.log("Response:", userData);

      if (password === userData.password) {
        alert("Login Success !!!");

        navigate("/admin-home");
      } else {
        setError("Incorrect credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
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
            LPG Gas Connect
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

                {error && <p className="text-danger">{error}</p>}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
