import React, { useEffect, useState } from "react";
import "../../../CSS/appointment.css"

import toast from "react-hot-toast";

import { getUserAppointments } from "../../../services/appointmentAPI";


function UserAppointment() {
   const [appointments, setAppointments] = useState([]);

   const token = localStorage.getItem("token");
   
   const [loading, setLoading] = useState(true);


   useEffect(() => {
     fetchAppointments();
   }, []);

   const fetchAppointments = async () => {
     setLoading(true);

     try {
       const res = await getUserAppointments(token);
       setAppointments(res.data.appointments);
     } catch (err) {
       toast.error(err.response?.data?.message);
     } finally {
       setLoading(false);
     }
   };

  return (
    <>
      <div className="appointments">
        <h4>My Appointments</h4>

        {loading ? (
          [...Array(5)].map((_, index) => (
            <div className="appointment-card skeleton-card" key={index}>
              <div className="appointment-left">
                <div className="doctor-icon skeleton skeleton-icon"></div>

                <div className="doctor-details">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-subtitle"></div>
                  <div className="skeleton skeleton-text"></div>
                </div>
              </div>

              <div className="appointment-right">
                <div className="skeleton skeleton-date"></div>
                <div className="skeleton skeleton-date"></div>
                <div className="skeleton skeleton-status"></div>
              </div>
            </div>
          ))
        ) : appointments.length > 0 ? (
          appointments.map((item) => (
            <div className="appointment-card" key={item._id}>
              <div className="appointment-left">
                <div className="doctor-icon">
                  <i className="fa-solid fa-stethoscope"></i>
                </div>

                <div className="doctor-details">
                  <h3>{item.doctor.user.name}</h3>
                  <h4>{item.doctor.specialization}</h4>
                  <p>{item.disease}</p>
                </div>
              </div>

              <div className="appointment-right">
                <div>
                  <i className="fa-regular fa-calendar"></i>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>

                <div>
                  <i className="fa-regular fa-clock"></i>
                  <span>{item.time}</span>
                </div>

                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </>
  );
}

export default UserAppointment
