import React, { useEffect, useState } from "react";
import "../../../CSS/userhome.css";
import { getAllDoctors } from "../../../services/doctorAPI";
import { bookAppointment } from "../../../services/appointmentAPI";
import toast from "react-hot-toast";
import profile_img from "../../../Assets/profile-img.jpg";

function UserHome() {


  const [doctors, setDoctors] = useState([]);

  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [appointment, setAppointment] = useState({
    date: "",
    time: "",
    disease: "",
  });

 const isDoctorAvailable = (doctor) => {
   if (!doctor.availableDays || !doctor.availableFrom || !doctor.availableTo) {
     return false;
   }

   const now = new Date();

   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   const currentDay = days[now.getDay()];

   if (!doctor.availableDays.includes(currentDay)) {
     return false;
   }

   const currentMinutes = now.getHours() * 60 + now.getMinutes();

   const [startHour, startMinute] = doctor.availableFrom.split(":").map(Number);

   const [endHour, endMinute] = doctor.availableTo.split(":").map(Number);

   const startMinutes = startHour * 60 + startMinute;
   const endMinutes = endHour * 60 + endMinute;

   return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
 };


  const handleBookAppointment = async () => {
    try {
      if (!appointment.date || !appointment.time || !appointment.disease) {
        return toast.error("Please fill all fields");
      }

      const data = {
        doctorId: selectedDoctor._id,
        date: appointment.date,
        time: appointment.time,
        disease: appointment.disease,
      };

      const res = await bookAppointment(data, token);

      toast.success(res.data.message);

      setShowModal(false);

      setAppointment({
        date: "",
        time: "",
        disease: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };


  useEffect(() => {
    fetchDoctors();
  }, []);


  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };
  const fetchDoctors = async () => {
    try {
      const res = await getAllDoctors(token);

      const approvedDoctors = res.data.doctors.filter(
        (doctor) => doctor.status === "Approved",
      );

      setDoctors(approvedDoctors);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load doctors");
    }
  };

  return (
    <>
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <div className="doctor-banner">
              <img
                src={
                  doctor.profileImage
                    ? `${import.meta.env.VITE_API_URL}${doctor.profileImage}`
                    : profile_img
                }
                alt={profile_img}
              />

              {isDoctorAvailable(doctor) ? (
                <div className="available">
                  <i
                    className="fa-solid fa-circle fa-fade"
                    style={{ color: "green" }}
                  ></i>
                  <span style={{ color: "green" }}>Available Today</span>
                </div>
              ) : (
                <div className="available">
                  <i
                    className="fa-solid fa-circle"
                    style={{ color: "red" }}
                  ></i>
                  <span style={{ color: "red" }}>Not Available</span>
                </div>
              )}

              <div className="profile-img">
                <img
                  src={
                    doctor.profileImage
                      ? `${import.meta.env.VITE_API_URL}${doctor.profileImage}`
                      : profile_img
                  }
                  alt={profile_img}
                />
              </div>
            </div>

            <div className="doctor-body">
              <h3>Dr. {doctor.user?.name}</h3>

              <span className="speciality">{doctor.specialization}</span>

              <p className="hospital">
                <i className="fa-regular fa-hospital"></i>
                {doctor.hospitalName}
              </p>

              <div className="doctor-info">
                <div>
                  <h4>{doctor.experience}y</h4>
                  <span>Exp.</span>
                </div>

                <div>
                  <h4>₹{doctor.consultationFee}</h4>
                  <span>Fee</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setShowModal(true);
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="appointment-overlay">
          <div className="appointment-modal">
            <div className="appointment-header">
              <h2>Book Appointment</h2>

              <button onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="appointment-body">
              <div className="input-box">
                <label>Doctor</label>

                <input
                  type="text"
                  value={selectedDoctor?.user?.name}
                  readOnly
                />
              </div>

              <div className="input-box">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={appointment.date}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box full">
                <label>Time</label>

                <input
                  type="time"
                  name="time"
                  value={appointment.time}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box full">
                <label>Reason / Disease</label>

                <textarea
                  rows="4"
                  name="disease"
                  value={appointment.disease}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="appointment-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="book-btn" onClick={handleBookAppointment}>
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserHome;
