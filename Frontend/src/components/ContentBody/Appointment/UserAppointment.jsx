import React, { useEffect, useState } from "react";
import "../../../CSS/appointment.css"

import toast from "react-hot-toast";

import { getUserAppointments } from "../../../services/appointmentAPI";


function UserAppointment() {
   const [appointments, setAppointments] = useState([]);

   const token = localStorage.getItem("token");
   


   useEffect(() => {
     fetchAppointments();
   }, []);

   const fetchAppointments = async () => {
     try {
       const res = await getUserAppointments(token);

       setAppointments(res.data.appointments);
     } catch (err) {
       toast.error(err.response?.data?.message);
     }
   };


  return (
    <>
      <div className="appointments">
        <h4>My Appointments</h4>

        {appointments.map((item) => (
          <div className="appointment-card" key={item.id}>
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
        ))}
      </div>
    </>
  );
}

export default UserAppointment
