
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { message } from "antd";
import p2 from "../../images/p2.png";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    type: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/register",
        user
      );
      if (res.data.success) {
        message.success("Account created successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbar expand="lg" className="top-nav">
        <Container fluid>
          <Navbar.Brand>
            <span className="navbar-brand-text">PulseCare</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll />
            <Nav className="top-nav-links">
              <Link to={"/"}>Overview</Link>
              <Link to={"/login"}>Sign in</Link>
              <Link to={"/register"}>Create account</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ border: "none" }}>
          <MDBRow
            style={{ background: "#eef2ff" }}
            className="g-0 border-none p-3"
          >
            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-3 flex-column">
                <div className="d-flex flex-row mb-3">
                  <span className="h3 fw-bold">
                    Create your PulseCare profile
                  </span>
                </div>
                <div className="p-2">
                  <Form onSubmit={handleSubmit}>
                    <label className="my-1 form-label" htmlFor="fullNameInput">
                      Full name
                    </label>
                    <MDBInput
                      id="fullNameInput"
                      style={{ height: "40px" }}
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}
                      type="text"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="emailInput">
                      Email address
                    </label>
                    <MDBInput
                      id="emailInput"
                      style={{ height: "40px" }}
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      type="email"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="passwordInput">
                      Password
                    </label>
                    <MDBInput
                      id="passwordInput"
                      style={{ height: "40px" }}
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      type="password"
                      size="sm"
                    />

                    <label className="my-1 form-label" htmlFor="phoneInput">
                      Phone number
                    </label>
                    <MDBInput
                      id="phoneInput"
                      style={{ height: "40px" }}
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      type="tel"
                      size="sm"
                    />

                    <Container className="my-3">
                      <MDBRadio
                        name="type"
                        id="adminRadio"
                        checked={user.type === "admin"}
                        value="admin"
                        onChange={handleChange}
                        label="Admin console"
                        inline
                      />
                      <MDBRadio
                        name="type"
                        id="userRadio"
                        checked={user.type === "user"}
                        value="user"
                        onChange={handleChange}
                        label="Patient / user"
                        inline
                      />
                    </Container>

                    <Button
                      style={{ marginTop: "20px" }}
                      className="mb-4 bg-dark"
                      variant="dark"
                      size="lg"
                      type="submit"
                    >
                      Sign up
                    </Button>
                  </Form>
                  <p
                    className="mb-5 pb-md-2"
                    style={{ color: "#4b5563" }}
                  >
                    Already on PulseCare?{" "}
                    <Link to={"/login"} style={{ color: "#1d4ed8" }}>
                      Sign in
                    </Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardImage
                style={{ mixBlendMode: "darken" }}
                src={p2}
                alt="register illustration"
                className="rounded-start w-100"
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;
