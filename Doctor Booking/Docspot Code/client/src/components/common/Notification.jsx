
import { Tabs, message } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getUser = () => {
    const userdata = JSON.parse(localStorage.getItem("userData"));
    if (userdata) {
      setUser(userdata);
    }
  };

  const handleAllMarkRead = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/getallnotification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const updatedUser = {
          ...user,
          notification: [],
          seennotification: [
            ...(user.seennotification || []),
            ...(user.notification || []),
          ],
        };
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        message.success(res.data.message);
        setUser(updatedUser);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllSeen = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8001/api/user/deleteallnotification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        const updatedUser = { ...user, seennotification: [] };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setUser(updatedUser);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="p-3 text-center">Notification centre</h2>
      <Tabs>
        <Tabs.TabPane tab="New" key={0}>
          <div className="d-flex justify-content-end">
            <h5
              style={{ cursor: "pointer" }}
              onClick={handleAllMarkRead}
              className="p-2 text-primary"
            >
              Mark all as read
            </h5>
          </div>
          {user?.notification?.map((notificationMsg, idx) => (
            <div
              key={idx}
              className="notification-card"
              onClick={() => navigate(notificationMsg.onClickPath)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
          {!user?.notification?.length && (
            <p className="text-muted text-center mt-3">
              You are all caught up. No new alerts.
            </p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="History" key={1}>
          <div className="d-flex justify-content-end">
            <h5
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllSeen}
              className="p-2 text-danger"
            >
              Clear history
            </h5>
          </div>
          {user?.seennotification?.map((notificationMsg, idx) => (
            <div
              key={idx}
              className="notification-card"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(notificationMsg.onClickPath)}
            >
              <div className="card-text">{notificationMsg.message}</div>
            </div>
          ))}
          {!user?.seennotification?.length && (
            <p className="text-muted text-center mt-3">
              No previous notifications.
            </p>
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Notification;
