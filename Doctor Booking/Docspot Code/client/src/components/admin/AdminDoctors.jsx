
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import axios from "axios";
import { message } from "antd";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/admin/getalldoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Unable to load doctor list");
    }
  };

  const handleApprove = async (doctorId, status, userid) => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/admin/getapprove",
        { doctorId, status, userid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getDoctors();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleReject = async (doctorId, status, userid) => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/admin/getreject",
        { doctorId, status, userid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getDoctors();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div>
      <Container>
        <h2 className="table-title">Registered doctors</h2>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Current status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.status}</td>
                  <td>
                    {user.status === "pending" ? (
                      <Button
                        onClick={() =>
                          handleApprove(user._id, "approved", user.userId)
                        }
                        className="mx-1"
                        size="sm"
                        variant="outline-success"
                      >
                        Approve
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleReject(user._id, "rejected", user.userId)
                        }
                        className="mx-1"
                        size="sm"
                        variant="outline-danger"
                      >
                        Reject
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <Alert variant="info" className="mb-0">
                    <Alert.Heading className="fs-6 mb-0">
                      No doctors available to display.
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

export default AdminDoctors;
