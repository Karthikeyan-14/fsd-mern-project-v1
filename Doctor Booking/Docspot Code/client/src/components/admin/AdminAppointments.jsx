
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import axios from "axios";

const AdminAppointments = () => {
  const [allAppointments, setAllAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/admin/getallAppointmentsAdmin",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAllAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div>
      <Container>
        <h2 className="table-title">Appointment overview</h2>
        <Table className="my-3" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Booked date &amp; time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allAppointments.length > 0 ? (
              allAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment._id}</td>
                  <td>{appointment.userInfo.fullName}</td>
                  <td>{appointment.doctorInfo.fullName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <Alert variant="info" className="mb-0">
                    <Alert.Heading className="fs-6 mb-0">
                      No appointments found right now.
                    </Alert.Heading>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminAppointments;
