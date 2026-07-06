import React, { useState, useEffect, useRef } from "react";
import "../CSS/doctorProfile.css";
import toast from "react-hot-toast";
import { getDoctorProfile, updateDoctorProfile } from "../services/doctorAPI";
import profile_img from "../Assets/profile-img.jpg";

function DoctorProfile() {


  const token = localStorage.getItem("token");
const [doctor, setDoctor] = useState({
  fullName: "",
  specialization: "",
  degree: "",
  experience: "",
  hospital: "",
  fee: "",
  address: "",
  description: "",
});


const fileInputRef = useRef(null);

const [image, setImage] = useState(profile_img);

const [imageFile, setImageFile] = useState(null);

const handleImageClick = () => {
  fileInputRef.current.click();
};

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setImageFile(file);

  setImage(URL.createObjectURL(file));
};

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
       const formData = new FormData();
        formData.append("fullName", doctor.fullName);
       formData.append("qualification", doctor.degree);
       formData.append("specialization", doctor.specialization);
       formData.append("experience", doctor.experience);
       formData.append("consultationFee", doctor.fee);
       formData.append("hospitalName", doctor.hospital);
       formData.append("address", doctor.address);
       formData.append("description", doctor.description);

       if (imageFile) {
         formData.append("profileImage", imageFile);
       }
     
       await updateDoctorProfile(formData, token);

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };


  useEffect(() => {
    loadProfile();
  }, []);

 const loadProfile = async () => {
   try {
     const res = await getDoctorProfile(token);

     setDoctor({
       fullName: res.data.doctor.user.name,
       specialization: res.data.doctor.specialization,
       degree: res.data.doctor.qualification,
       experience: res.data.doctor.experience,
       hospital: res.data.doctor.hospitalName,
       fee: res.data.doctor.consultationFee,
       address: res.data.doctor.address,
       description: res.data.doctor.description,
     });

     if (res.data.doctor.profileImage) {
       setImage(`http://localhost:1300${res.data.doctor.profileImage}`);
     }
   } catch (err) {
     toast.error(err.response?.data?.message || "Error loading profile");
   }
 };


  return (
    <div className="doctor-profile">
      <div className="profile-banner"></div>

      <div className="profile-image">
        <img src={image} alt="Doctor" />

        <button type="button" onClick={handleImageClick}>
          <i className="fa-solid fa-pen"></i>
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="profile-form">
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={doctor.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Degree</label>
          <input
            type="text"
            name="degree"
            value={doctor.degree}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Experience</label>
          <input
            type="number"
            name="experience"
            value={doctor.experience}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Hospital</label>
          <input
            type="text"
            name="hospital"
            value={doctor.hospital}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label>Consultation Fee (₹)</label>
          <input
            type="text"
            name="fee"
            value={doctor.fee}
            onChange={handleChange}
          />
        </div>

        <div className="input-box full">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={doctor.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-box full">
          <label>Professional Description</label>

          <textarea
            rows="5"
            name="description"
            value={doctor.description}
            onChange={handleChange}
          />
        </div>

        <button className="save-btn" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default DoctorProfile;
