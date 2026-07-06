import React,{useState} from 'react'
import { applyDoctor } from "../../services/doctorAPI";
import toast from "react-hot-toast";

import "../../CSS/applyDoctor.css"

function ApplyDoctor() {


  const [formData, setFormData] = useState({
    qualification: "",
    specialization: "",
    experience: "",
    consultationFee: "",
    hospitalName: "",
    availableFrom: "",
    availableTo: "",
    address: "",
    description: "",
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [selectedDays, setSelectedDays] = useState([]);
const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = {
      ...formData,
      availableDays: selectedDays,
    };

    const res = await applyDoctor(data, token);

    toast.success(res.data.message);

    setFormData({
      qualification: "",
      specialization: "",
      experience: "",
      consultationFee: "",
      hospitalName: "",
      availableFrom: "",
      availableTo: "",
      address: "",
      description: "",
    });

    setSelectedDays([]);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <>
      <div className="apply-doctor">
        <div className="apply-doctor-header">
          <h4>Join Us as a Doctor</h4>
          <span>Fill in your professional details to get started</span>
        </div>

        <form className="apply-doctor-form" onSubmit={handleSubmit}>
          <div className="container">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Qualification</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="e.g. MBBS, MD"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Specialization</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="e.g. Cardiologist"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Experience (years)</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Years of experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Consultation Fee (₹)</label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Consultation fee"
                  name="consultationFee"
                  value={formData.consultationFee}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-12">
                <label>Hospital / Clinic Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Hospital or Clinic Name"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <label>Available From</label>
                <input
                  className="form-control"
                  type="time"
                  name="availableFrom"
                  value={formData.availableFrom}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Available To</label>
                <input
                  className="form-control"
                  type="time"
                  name="availableTo"
                  value={formData.availableTo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="day-selector row mt-1 g-3">
              <label>Available days</label>
              <div>
                {days.map((day) => (
                  <button
                    type="button"
                    key={day}
                    className={`day-btn ${
                      selectedDays.includes(day) ? "active" : ""
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-12">
                <label>Address</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Clinic address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row g-3 mt-1">
              <div className="col-md-12">
                <label>Professional Description</label>
                <textarea
                  className="form-control"
                  placeholder="Describe your expertise and experience..."
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button className="apply-doctor-btn" type="submit">
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
}

export default ApplyDoctor
