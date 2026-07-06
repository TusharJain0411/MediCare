import React, { useEffect, useState, useCallback } from "react";
import "../CSS/DoctorsTable.css";


import {
  getAllDoctors,
  approveDoctor,
  rejectDoctor,
  deleteDoctor
} from "../services/doctorAPI";

import toast from "react-hot-toast";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);


  const handleDelete = async (id) => {
    try {
      const res = await deleteDoctor(id, token);

      toast.success(res.data.message);

      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await getAllDoctors(token);
      setDoctors(res.data.doctors);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleApprove = async (id) => {
    try {
      const res = await approveDoctor(id, token);

      toast.success(res.data.message);
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await rejectDoctor(id, token);

      toast.success(res.data.message);
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="doctor-table-wrapper">
        <div className="doctor-list">
          <div className="doctor-header">
            <div>Doctor</div>
            <div>Specialization</div>
            <div>Hospital</div>
            <div>Fee</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {doctors.map((doctor) => (
            <div className="doctor-row" key={doctor._id}>
              <div className="doctor-information">
                <h4>{doctor.user?.name}</h4>
                <span>{doctor.qualification}</span>
              </div>

              <div className="specialization">{doctor.specialization}</div>

              <div className="Hospital">{doctor.hospitalName}</div>

              <div className="fee">₹{doctor.consultationFee}</div>

              <div>
                <span
                  className={`status ${
                    doctor.status === "Approved"
                      ? "active"
                      : doctor.status === "Rejected"
                        ? "rejected"
                        : "pending"
                  }`}
                >
                  {doctor.status === "Approved"
                    ? "active"
                    : doctor.status === "Rejected"
                      ? "rejected"
                      : "pending"}
                </span>
              </div>

              <div className="doctorAction-approval">
                {doctor.status === "Pending" ? (
                  <>
                    <button onClick={() => handleApprove(doctor._id)}>
                      Approve
                    </button>

                    <button onClick={() => handleReject(doctor._id)}>
                      Reject
                    </button>
                  </>
                ) : (
                  <div className="doctorActions">
                    <button
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowModal(true);
                      }}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>

                    <button onClick={() => handleDelete(doctor._id)}>
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-center align-items-center p-4">
            Showing {doctors.length} of {doctors.length} doctor
            {doctors.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {showModal && selectedDoctor && (
        <div className="doctor-modal-overlay">
          <div className="doctor-modal">
            <div className="doctor-modal-header">
              <h3>Doctor Details</h3>

              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  setSelectedDoctor(null);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="doctor-modal-body">
              <div className="detail">
                <span>Name</span>
                <p>{selectedDoctor.user.name}</p>
              </div>

              <div className="detail">
                <span>Email</span>
                <p>{selectedDoctor.user.email}</p>
              </div>

              <div className="detail">
                <span>Phone</span>
                <p>{selectedDoctor.user.phone}</p>
              </div>

              <div className="detail">
                <span>Qualification</span>
                <p>{selectedDoctor.qualification}</p>
              </div>

              <div className="detail">
                <span>Specialization</span>
                <p>{selectedDoctor.specialization}</p>
              </div>

              <div className="detail">
                <span>Experience</span>
                <p>{selectedDoctor.experience} Years</p>
              </div>

              <div className="detail">
                <span>Consultation Fee</span>
                <p>₹{selectedDoctor.consultationFee}</p>
              </div>

              <div className="detail">
                <span>Hospital</span>
                <p>{selectedDoctor.hospitalName}</p>
              </div>

              <div className="detail">
                <span>Available Time</span>
                <p>
                  {selectedDoctor.availableFrom} - {selectedDoctor.availableTo}
                </p>
              </div>

              <div className="detail">
                <span>Available Days</span>
                <p>{selectedDoctor.availableDays.join(", ")}</p>
              </div>

              <div className="detail">
                <span>Address</span>
                <p>{selectedDoctor.address}</p>
              </div>

              <div className="detail description">
                <span>Description</span>
                <p>{selectedDoctor.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorsList;







