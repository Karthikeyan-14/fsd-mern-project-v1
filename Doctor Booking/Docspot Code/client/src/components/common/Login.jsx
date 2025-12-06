
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { message } from "antd";
import { Button, Form } from "react-bootstrap";
import photo1 from "../../images/photo1.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.userData));
        message.success("Signed in successfully");

        const isLoggedIn = JSON.parse(localStorage.getItem("userData"));
        const { type } = isLoggedIn;

        switch (type) {
          case "admin":
            navigate("/adminhome");
            break;
          case "user":
            navigate("/userhome");
            break;
          default:
            navigate("/login");
            break;
        }
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
              <MDBCardImage
                src={photo1}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-5 flex-column">
                <div className="d-flex flex-row mt-2 mb-4">
                  <span className="h3 fw-bold mb-0">
                    Welcome back to PulseCare
                  </span>
                </div>

                <Form onSubmit={handleSubmit}>
                  <label
                    className="form-label"
                    htmlFor="formControlLgEmail"
                  >
                    Email address
                  </label>
                  <MDBInput
                    style={{ margin: "5px auto" }}
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    id="formControlLgEmail"
                    type="email"
                    size="md"
                    autoComplete="off"
                  />

                  <label
                    className="form-label mt-2"
                    htmlFor="formControlLgPassword"
                  >
                    Password
                  </label>
                  <MDBInput
                    style={{ margin: "5px auto" }}
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    id="formControlLgPassword"
                    type="password"
                    size="md"
                    autoComplete="off"
                  />

                  <Button
                    className="mt-4 mb-3 px-5 bg-dark"
                    size="lg"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Form>

                <p className="mb-5 pb-lg-2" style={{ color: "#4b5563" }}>
                  New to PulseCare?{" "}
                  <Link to={"/register"} style={{ color: "#1d4ed8" }}>
                    Create your account
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Login;
