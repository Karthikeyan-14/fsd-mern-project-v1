
import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

const DoctorList = ({ userDoctorId, doctor, userdata }) => {
  const [dateTime, setDateTime] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [show, setShow] = useState(false);

  const currentDate = new Date().toISOString().slice(0, 16);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleDocumentChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const formattedDateTime = dateTime.replace("T", " ");
      const formData = new FormData();
      formData.append("image", documentFile);
      formData.append("date", formattedDateTime);
      formData.append("userId", userDoctorId);
      formData.append("doctorId", doctor._id);
      formData.append("userInfo", JSON.stringify(userdata));
      formData.append("doctorInfo", JSON.stringify(doctor));

      const res = await axios.post(
        "http://localhost:8001/api/user/getappointment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Subtitle className="mb-1 text-muted">
            {doctor.specialization}
          </Card.Subtitle>
          <Card.Title className="mb-2">Dr. {doctor.fullName}</Card.Title>

          <Card.Text className="mb-1">
            <small>Experience</small>
            <br />
            <strong>{doctor.experience} years</strong>
          </Card.Text>

          <Card.Text className="mb-1">
            <small>Consultation fee</small>
            <br />
            <strong>₹ {doctor.fees}</strong>
          </Card.Text>

          <Card.Text className="mb-1">
            <small>Location</small>
            <br />
            <span>{doctor.address}</span>
          </Card.Text>

          <Card.Text className="mb-2">
            <small>Contact</small>
            <br />
            <span>{doctor.phone}</span>
          </Card.Text>

          <Card.Text className="mb-3">
            <small>Available slot</small>
            <br />
            <span>
              {doctor.timings[0]} – {doctor.timings[1]}
            </span>
          </Card.Text>

          <Button variant="primary" onClick={handleShow}>
            Book this doctor
          </Button>

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm appointment</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleBook}>
              <Modal.Body>
                <strong>Doctor details</strong>
                <hr />
                <p className="mb-1">
                  <b>Name:</b> Dr. {doctor.fullName}
                </p>
                <p className="mb-1">
                  <b>Specialisation:</b> {doctor.specialization}
                </p>
                <p>
                  <b>Fee:</b> ₹ {doctor.fees}
                </p>

                <Row className="mb-3">
                  <Col md={{ span: 10, offset: 1 }}>
                    <Form.Group controlId="appointmentDateTime" className="mb-3">
                      <Form.Label>Appointment date &amp; time</Form.Label>
                      <Form.Control
                        name="date"
                        type="datetime-local"
                        size="sm"
                        min={currentDate}
                        value={dateTime}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formFileSm" className="mb-3">
                      <Form.Label>Upload related documents (optional)</Form.Label>
                      <Form.Control
                        accept="image/*"
                        type="file"
                        size="sm"
                        onChange={handleDocumentChange}
                      />
                      <Form.Text muted>
                        Upload prescriptions or reports to help your doctor
                        prepare.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm booking
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default DoctorList;
