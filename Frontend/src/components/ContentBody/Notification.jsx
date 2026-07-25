import React, { useEffect, useState } from "react";
import "../../CSS/notification.css";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  deleteAllNotifications,
} from "../../services/userAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  setUnreadCount,
  decreaseUnreadCount,
  clearUnreadCount,
} from "../../Redux/slices/notificationSlice";


function Notification() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const dispatch = useDispatch();

  const icon = (type) => {
    switch (type) {
      case "success":
        return "fa-solid fa-circle-check";
      case "danger":
        return "fa-solid fa-circle-xmark";
      case "warning":
        return "fa-solid fa-circle-exclamation";
      default:
        return "fa-regular fa-bell";
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

const fetchNotifications = async () => {
  setLoading(true);

  try {
    const res = await getNotifications(token);

    setNotifications(res.data.notifications);

    dispatch(
      setUnreadCount(res.data.notifications.filter((n) => !n.isRead).length),
    );
  } catch (err) {
    toast.error("Failed to load notifications");
  } finally {
    setLoading(false);
  }
};

const handleReadAll = async () => {
  try {
    await markAllNotificationsRead(token);

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      })),
    );

    dispatch(clearUnreadCount());

    toast.success("All notifications marked as read");
  } catch (err) {
    toast.error("Something went wrong");
  }
};


 const handleNotificationClick = async (notification) => {
   try {
     await markNotificationRead(notification._id, token);

     setNotifications((prev) =>
       prev.map((n) =>
         n._id === notification._id ? { ...n, isRead: true } : n,
       ),
     );

     if (!notification.isRead) {
       dispatch(decreaseUnreadCount());
     }

     if (notification.referenceId) {
       navigate(`${notification.link}/${notification.referenceId}`);
     } else {
       navigate(notification.link);
     }
   } catch (err) {
     toast.error("Something went wrong");
   }
 };

const handleDeleteAll = async () => {
  try {
    await deleteAllNotifications(token);

    setNotifications([]);

    dispatch(clearUnreadCount());

    toast.success("All notifications deleted");
  } catch (err) {
    toast.error("Failed to delete notifications");
  }
};

  return (
    <div className="notification-page">
      {(!loading && notifications.length != 0) && (
        <div className="notification-header">
          <span>{unreadCount} unread notifications</span>

          <div className="notification-actions">
            <button
              onClick={handleReadAll}
              disabled={notifications.length === 0}
            >
              Mark all as read
            </button>

            <button
              onClick={handleDeleteAll}
              disabled={notifications.length === 0}
              className="delete-btn"
            >
              Delete all
            </button>
          </div>
        </div>
      )}

      {loading ? (
        [...Array(6)].map((_, index) => (
          <div className="notification-card skeleton-card" key={index}>
            <div className="notification-icon skeleton skeleton-icon"></div>

            <div className="notification-body">
              <div className="skeleton skeleton-title"></div>

              <div className="skeleton skeleton-message"></div>
              <div className="skeleton skeleton-message short"></div>

              <div className="skeleton skeleton-time"></div>
            </div>
          </div>
        ))
      ) : notifications.length === 0 ? (
        <h4 style={{ textAlign: "center", marginTop: 30 }}>No Notifications</h4>
      ) : (
        notifications.map((item) => (
          <div
            className={`notification-card ${!item.isRead ? "unread" : ""}`}
            key={item._id}
            onClick={() => handleNotificationClick(item)}
            style={{ cursor: "pointer" }}
          >
            <div className={`notification-icon ${item.type}`}>
              <i className={icon(item.type)}></i>
            </div>

            <div className="notification-body">
              <h3>{item.title}</h3>
              <p>{item.message}</p>

              <span>{new Date(item.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Notification;
