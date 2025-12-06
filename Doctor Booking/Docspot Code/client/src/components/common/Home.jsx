
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

import p3 from "../../images/p3.webp";

const Home = () => {
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

      <section className="home-hero">
        <div className="home-hero-left">
          <span className="home-pill">Digital health scheduling</span>
          <h1 className="home-title">
            Book smarter, breathe easier with{" "}
            <span className="accent">PulseCare</span>.
          </h1>
          <p className="home-subtitle">
            A single place to discover doctors, share your reports and lock your
            appointment in minutes without phone calls or waiting rooms.
          </p>

          <div className="home-cta-row">
            <Button className="btn-primary-hero">
              <Link to={"/login"}>Book a visit</Link>
            </Button>
            <Button variant="outline-light" className="btn-outline-hero">
              <Link to={"/register"}>Join PulseCare</Link>
            </Button>
          </div>

          <div className="home-hero-meta">
            <span>⏱ 24×7 booking access</span>
            <span>🩺 Verified medical professionals</span>
            <span>🔐 Secure records & uploads</span>
          </div>
        </div>

        <div className="home-hero-right">
          <img alt="Doctor consultation" src={p3} />
        </div>
      </section>

      <section className="about-section">
        <div className="about-header">
          <h1>Why PulseCare?</h1>
          <p className="text-muted mb-0">
            Thoughtful scheduling built for patients, doctors and clinics.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-text">
            <p>
              PulseCare replaces phone calls and paper diaries with a
              fast, guided booking flow. Pick a doctor, choose a slot that fits
              your day, upload any supporting reports and get instant
              confirmation no guessing, no back and-forth.
            </p>
            <p>
              Doctors get a clear view of upcoming visits, patient notes and
              shared documents before the appointment even starts. Patients get
              reminders and a simple view of their upcoming visits in one place.
            </p>
            <p>
              Whether you are scheduling a routine check-up or a specialist
              consultation, PulseCare keeps everyone aligned so you can focus on
              care, not coordination.
            </p>
          </div>

          <div className="about-highlights">
            <div className="about-card">
              <div className="about-card-title">Instant booking</div>
              <div className="about-card-body">
                Browse available doctors, see their fees and experience, and
                book an appointment that matches your schedule.
              </div>
            </div>
            <div className="about-card">
              <div className="about-card-title">Document ready visits</div>
              <div className="about-card-body">
                Upload medical images or reports while booking so your doctor
                can prepare before you arrive.
              </div>
            </div>
            <div className="about-card">
              <div className="about-card-title">Role based console</div>
              <div className="about-card-body">
                Separate admin, doctor and patient views keep controls focused
                and simple for each role.
              </div>
            </div>
            <div className="about-card">
              <div className="about-card-title">Notifications that matter</div>
              <div className="about-card-body">
                Appointment updates, approvals and important alerts land in a
                clean notification center inside the app.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
