
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { Container } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

function ApplyDoctor({ userId }) {
  const [doctor, setDoctor] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: "",
  });

  const handleTimingChange = (_, timings) => {
    setDoctor({ ...doctor, timings });
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/registerdoc",
        { doctor, userId: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Container>
      <h2 className="text-center p-3">Doctor onboarding form</h2>
      <Form onFinish={handleSubmit} layout="vertical" className="m-3">
        <h4 className="mb-3">Personal details</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Full name" required>
              <Input
                name="fullName"
                value={doctor.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Phone" required>
              <Input
                value={doctor.phone}
                onChange={handleChange}
                name="phone"
                type="number"
                placeholder="Contact number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Email" required>
              <Input
                value={doctor.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Professional email"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Clinic / practice address" required>
              <Input
                value={doctor.address}
                onChange={handleChange}
                name="address"
                type="text"
                placeholder="Consultation address"
              />
            </Form.Item>
          </Col>
        </Row>

        <h4 className="mb-3">Professional details</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Specialisation" required>
              <Input
                value={doctor.specialization}
                onChange={handleChange}
                type="text"
                name="specialization"
                placeholder="e.g. Cardiologist, Dermatologist"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Experience (years)" required>
              <Input
                value={doctor.experience}
                onChange={handleChange}
                type="number"
                name="experience"
                placeholder="Total years of practice"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Consultation fee" required>
              <Input
                value={doctor.fees}
                onChange={handleChange}
                name="fees"
                type="number"
                placeholder="Fee per visit"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Available timings" name="timings" required>
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={handleTimingChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-primary" type="submit">
            Submit application
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplyDoctor;
