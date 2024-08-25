import React, { useRef } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App2.css";

function CustomerHome() {
  const navigate = useNavigate();

  const welcomeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const id = sessionStorage.getItem("customerID");

  const handleLogOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const collaboratorSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
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
            <Nav id="nav0">
              <Button
                id="button2"
                style={{
                  fontSize: "12px",
                  fontFamily: "verdana",
                  fontWeight: "bold",
                }}
                onClick={() => scrollToSection(welcomeRef)}
              >
                Home
              </Button>
            </Nav>
            <Nav id="nav0">
              <Button
                id="button2"
                style={{
                  fontSize: "12px",
                  fontFamily: "verdana",
                  fontWeight: "bold",
                }}
                onClick={() => scrollToSection(aboutRef)}
              >
                About Us
              </Button>
            </Nav>
            <Nav id="nav0">
              <Button
                id="button2"
                style={{
                  fontSize: "12px",
                  fontFamily: "verdana",
                  fontWeight: "bold",
                }}
                onClick={() => scrollToSection(contactRef)}
              >
                Contact Us
              </Button>
            </Nav>
            <Nav id="nav0">
              <NavDropdown title="Connections" id="basic-nav-dropdown">
                <NavDropdown.Item id="homeback">
                  <Link to="/view-connections">
                    <button id="homebutton">View Connections</button>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav id="nav0">
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
            <Nav id="nav2">
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
            <Nav id="nav2">
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
                <NavDropdown.Item as="button" onClick={handleLogOut}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div ref={welcomeRef} id="welcome-section">
        <Slider {...sliderSettings}>
          <div className="slider-slide">
            <img
              src="https://www.india.gov.in/sites/upload_files/npi/files/spotlights/ujjwala-yojana-inner.jpg"
              alt="Ujjwala Yojana"
              className="slider-image"
            />
            <p className="slider-caption">Pradhan Mantri Ujjwala Yojana</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://media.licdn.com/dms/image/D4D22AQG2kQ5DbibY_A/feedshare-shrink_800/0/1703165437031?e=2147483647&v=beta&t=fOcjrk8jkF9IsyEhTS6Ig2RCxEugjrbjmHEtbpj3RgE"
              alt="Indane Connections"
              className="slider-image"
            />
            <p className="slider-caption">Indane Connections</p>
          </div>
          <div className="slider-slide">
            <img
              src="https://images.tv9hindi.com/wp-content/uploads/2021/06/eVzDuzUI.jpg?w=1280&enlarge=true"
              alt="Register for PNG"
              className="slider-image"
            />
            <p className="slider-caption">Register For PNG</p>
          </div>
        </Slider>
      </div>
      <div className="text-block">
        <center>
          <h1
            style={{
              marginTop: "50px",
              fontSize: "25px",
              fontFamily: "verdana",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Customer Home
          </h1>
        </center>
        <br />
        <center>
          <p
            style={{
              fontSize: "25px",
              fontStyle: "italic",
              textDecoration: "none",
            }}
          >
            Welcome to your account.
          </p>
        </center>
        <center>
          <p
            style={{
              fontSize: "25px",
              fontStyle: "italic",
              textDecoration: "none",
            }}
          >
            Here you can manage your connections and bookings.
          </p>
        </center>
        <center>
          <button id="button">
            <Link
              to="/view-requests"
              style={{
                fontSize: "20px",
                textDecoration: "none",
                fontStyle: "italic",
                color: "white",
              }}
            >
              Connection Request
            </Link>
          </button>
          <button id="button">
            <Link
              to="/cylinder-booking"
              style={{
                fontSize: "20px",
                textDecoration: "none",
                fontStyle: "italic",
                color: "white",
              }}
            >
              Book a Cylinder
            </Link>
          </button>
        </center>
      </div>

      <Container className="mt-5">
        <h2 className="home-title">About Us</h2>
        <div ref={aboutRef}>
          <Slider {...collaboratorSliderSettings}>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://i.pinimg.com/originals/d4/30/d9/d430d9d625fce9c16dfae8b44b402e81.jpg"
                  alt="Collaborator 1"
                />
                <Card.Body>
                  <Card.Title>HP</Card.Title>
                  <Card.Text>
                    Providing expert support and services for our gas connection
                    system.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://5.imimg.com/data5/SELLER/Default/2024/1/379708269/NQ/LX/JU/135302587/gas-safe-india-domestic-gas-safety-device-500x500.jpg"
                  alt="Collaborator 2"
                />
                <Card.Body>
                  <Card.Title>Gas Safe</Card.Title>
                  <Card.Text>
                    Ensuring safety and efficiency in all our gas connections.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgdE15GlMWUddgazyOTbA5LRZ0sSWZvbobSwD7QdgqlKxI6Etm7Z_PcjSFWFTY96-3n4&usqp=CAU"
                  alt="Collaborator 3"
                />
                <Card.Body>
                  <Card.Title>UI</Card.Title>
                  <Card.Text>
                    Enhancing user experience with seamless service.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://i.pinimg.com/736x/b2/f9/33/b2f93328dedc3d7c86967e492aa03b39.jpg"
                  alt="Collaborator 4"
                />
                <Card.Body>
                  <Card.Title>Indane</Card.Title>
                  <Card.Text>
                    Supporting community outreach and engagement.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card className="collaborator-card">
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBMLKTe4GuzhIPudTQ0zkv2O1Tw7P_AY-2Og&s"
                  alt="Collaborator 5"
                />
                <Card.Body>
                  <Card.Title>Environmental sustainability</Card.Title>
                  <Card.Text>
                    Commitment to environmental sustainability.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Slider>
        </div>
      </Container>

      <Container className="mt-5">
        <div className="contact-section" ref={contactRef}>
          <div className="contact-image">
            <img
              src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg"
              alt="Contact Us"
              className="contact-image"
            />
          </div>
          <div className="contact-form">
            <h2 className="home-title">Contact Us</h2>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="home-title">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="home-title">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group controlId="formFeedback">
                <Form.Label className="home-title">Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your feedback"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CustomerHome;
