import React, { useState,useEffect } from "react";
import "../../../CSS/doctorAppointment.css";
import {useSelector} from "react-redux";

import {
  getDoctorAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
} from "../../../services/appointmentAPI";

import toast from "react-hot-toast";

function DoctorAppointment() {

  const Nav_width = useSelector((state) => state.alert.Nav_width);


  const [appointments, setAppointments] = useState([]);

  const token = localStorage.getItem("token");
 

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getDoctorAppointments(token);

      setAppointments(res.data.appointments);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };


  const handleStatus = async (id, status) => {
    try {
      if (status === "Approved") await approveAppointment(id, token);

      if (status === "Rejected") await rejectAppointment(id, token);

      if (status === "Completed") await completeAppointment(id, token);

      toast.success(`Appointment ${status}`);

      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };


  const canCompleteAppointment = (appointmentDate, appointmentTime) => {
    const now = new Date();

    const appointment = new Date(appointmentDate);

    // Parse "HH:MM"
    const [hours, minutes] = appointmentTime.split(":").map(Number);

    appointment.setHours(hours, minutes, 0, 0);

    // Allow completion after 1 hour
    const completionTime = new Date(appointment.getTime() + 60 * 60 * 1000);

    return now >= completionTime;
  };

  return (
    <div className="doctor-appointment">
      <h2 className="appointment-title">Patient Appointments</h2>

      {appointments.map((item) => (
        <div
          className={!Nav_width ? " nav-width-ac" : "appointment-card"}
          key={item._id}
        >
          <div className="patient-details">
            <div className="patient-avatar">{item.user.name.charAt(0)}</div>

            <div className="patient-info">
              <h3>{item.user.name}</h3>

              <p>{item.disease}</p>
              <span>
                {new Date(item.date).toLocaleDateString()} · {item.time}
              </span>
            </div>
          </div>

          <div className="appointment-actions">
            <span className={`status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>

            {item.status === "Pending" && (
              <>
                <button
                  className="approve-btn"
                  onClick={() => handleStatus(item._id, "Approved")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => handleStatus(item._id, "Rejected")}
                >
                  Reject
                </button>
              </>
            )}

            {item.status === "Approved" && (
              <button
                className="complete-btn"
                disabled={!canCompleteAppointment(item.date, item.time)}
                onClick={() => handleStatus(item._id, "Completed")}
              >
                Complete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorAppointment;
