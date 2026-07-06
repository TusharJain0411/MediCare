import React, { useEffect, useState } from "react";
import "../../../CSS/admindashboard.css";
import { getRecentDoctors } from "../../../services/doctorAPI";
import { getDashboardStats } from "../../../services/adminAPI";
import toast from "react-hot-toast";
import profile_img from "../../../Assets/profile-img.jpg";

function AdminDashboard() {
   
  const [stats, setStats] = useState({});

  const [recentDoctors, setRecentDoctors] = useState([]);

  const token = localStorage.getItem("token");



  const fetchRecentDoctors = async () => {
    try {
      const { data } = await getRecentDoctors(token);

      if (data.success) {
        setRecentDoctors(data.doctors);
      }
    } catch (error) {
      toast.error("Failed to load recent doctors");
    }
  };

  const fetchDashboard = async () => {
    try {
      const { data } = await getDashboardStats(token);

      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      toast.error("Failed to load dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchRecentDoctors();
  }, []);

  return (
    <>
      <div className="dashboard">
        {/* Top Cards */}
        <div className="dashboard-cards">
          <div className="dash-card">
            <div>
              <span>Total Users</span>
              <h2>{stats.totalUsers || 0}</h2>
            </div>

            <div className="icon blue">
              <i className="fa-solid fa-users"></i>
            </div>
          </div>

          <div className="dash-card">
            <div>
              <span>Total Doctors</span>
              <h2>{stats.totalDoctors || 0}</h2>
            </div>

            <div className="icon green">
              <i className="fa-solid fa-user-doctor"></i>
            </div>
          </div>

          <div className="dash-card">
            <div>
              <span>Pending Applications</span>
              <h2>{stats.pendingApplications || 0}</h2>
            </div>

            <div className="icon yellow">
              <i className="fa-solid fa-circle-exclamation"></i>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="dashboard-bottom">
          {/* Recent Doctors */}
          <div className="recent-doctors">
            <h2>Recent Doctors</h2>

            {recentDoctors.length > 0 ? (
              recentDoctors.map((doctor) => (
                <div className="inside-doctor-row" key={doctor._id}>
                  <div className="recent-doctor-info">
                    <img
                      src={
                        doctor.profileImage
                          ? `${import.meta.env.VITE_API_URL}${doctor.profileImage}`
                          : profile_img
                      }
                      alt={doctor.user?.name}
                    />

                    <div>
                      <h4>{doctor.user?.name}</h4>
                      <span>{doctor.specialization}</span>
                    </div>
                  </div>

                  <button>
                    {doctor.status === "Approved" ? "Active" : "Pending"}
                  </button>
                </div>
              ))
            ) : (
              <p>No recent doctors found.</p>
            )}
          </div>

          {/* Overview */}
          <div className="overview">
            <h2>System Overview</h2>

            <div className="progress-box">
              <div className="title">
                <span>Platform Uptime</span>
                <span>{stats.platformUptime || 0}%</span>
              </div>

              <div className="progress">
                <div
                  style={{
                    width: `${stats.platformUptime || 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="progress-box">
              <div className="title">
                <span>Appointment Success Rate</span>
                <span>{stats.appointmentSuccessRate || 0}%</span>
              </div>

              <div className="progress">
                <div
                  style={{
                    width: `${stats.appointmentSuccessRate || 0}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="progress-box">
              <div className="title">
                <span>Doctor Approval Rate</span>
                <span>{stats.doctorApprovalRate || 0}%</span>
              </div>

              <div className="progress">
                <div
                  style={{
                    width: `${stats.doctorApprovalRate || 0}%`,
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

export default AdminDashboard;
