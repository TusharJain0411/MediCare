import React, { useEffect, useState } from "react";
import "../../../CSS/DoctorHome.css";
import toast from "react-hot-toast";
import { getTodayAppointments,getDoctorDashboard } from "../../../services/appointmentAPI";


function DoctorHome() {
  
const [todayAppointments, setTodayAppointments] = useState([]);

const token = localStorage.getItem("token");

const [stats, setStats] = useState({
  todayAppointments: 0,
  pendingRequests: 0,
  completedAppointments: 0,
  totalPatients: 0,
  appointmentsThisWeek: 0,
  profileCompletion: 0,
});

const fetchDashboard = async () => {
  try {
    const { data } = await getDoctorDashboard(token);

    if (data.success) {
      setStats(data.stats);
    }
  } catch {
    toast.error("Failed to load dashboard");
  }
};



const fetchTodayAppointments = async () => {
  try {
    const { data } = await getTodayAppointments(token);

    if (data.success) {
      setTodayAppointments(data.appointments);
    }
  } catch (err) {
    toast.error("Failed to load appointments");
  }
};

useEffect(() => {
  fetchDashboard();
  fetchTodayAppointments();
}, []);

  return (
    <>
      <div className="doctorhome">
        {/* Top Cards */}
        <div className="doctorhome-cards">
          <div className="doc-card">
            <div>
              <span>Today's Appointment</span>
              <h2>{stats.todayAppointments}</h2>
            </div>

            <div className="icon blue">
              <i className="fa-regular fa-calendar"></i>
            </div>
          </div>

          <div className="doc-card">
            <div>
              <span>Pending Requests</span>
              <h2>{stats.pendingRequests}</h2>
            </div>

            <div className="icon yellow">
              <i className="fa-solid fa-circle-exclamation"></i>
            </div>
          </div>

          <div className="doc-card">
            <div>
              <span>Appointment Completed</span>
              <h2>{stats.completedAppointments}</h2>
            </div>

            <div className="icon green">
              <i className="fa-regular fa-circle-check"></i>
            </div>
          </div>

          <div className="doc-card">
            <div>
              <span>Total Patients</span>
              <h2>{stats.totalPatients}</h2>
            </div>

            <div className="icon puple">
              <i className="fa-solid fa-user-group"></i>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="doctor-dashboard-bottom">
          {/* Today's Schedule */}
          <div className="schedule-card">
            <h2>Today's Schedule</h2>

            {todayAppointments.length ? (
              todayAppointments.map((appointment) => (
                <div className="schedule-item" key={appointment._id}>
                  <div className="schedule-left">
                    <div className="schedule-line"></div>

                    <div className="schedule-details">
                      <h4>{appointment.user.name}</h4>
                      <p>{appointment.disease}</p>
                    </div>
                  </div>

                  <div className="schedule-right">
                    <h3>{appointment.time}</h3>

                    <span
                      className={`schedule-status ${
                        appointment.status === "Approved"
                          ? "approved"
                          : appointment.status === "Pending"
                            ? "pending"
                            : appointment.status === "Completed"
                              ? "completed"
                              : "rejected"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No appointments for today.</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="quick-stats-card">
            <h2>Quick Stats</h2>

            <div className="stats-item">
              <div className="stats-header">
                <span>Appointments This Week</span>
                <span>{stats.appointmentsThisWeek}</span>
              </div>

              <div className="stats-progress">
                <div
                  style={{
                    width: `${Math.min(stats.appointmentsThisWeek * 10, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="stats-item">
              <div className="stats-header">
                <span>Profile Completion</span>
                <span>{stats.profileCompletion}%</span>
              </div>

              <div className="stats-progress">
                <div
                  style={{
                    width: `${stats.profileCompletion}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}

export default DoctorHome;
