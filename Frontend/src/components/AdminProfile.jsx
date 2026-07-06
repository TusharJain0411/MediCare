import React, { useEffect, useState } from "react";
import "../CSS/adminProfile.css";
import axios from "axios";
import toast from "react-hot-toast";
import {updateAdmin,getAdmin} from "../services/userAuth"

function AdminProfile() {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    totalAppointments: 0,
    isAdmin: false,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getAdmin(token);

      setForm(res.data.user);
    } catch (err) {
      toast.error("Failed to load profile");
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await updateAdmin(token,form);

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update Failed");
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="admin-profile">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-logo">
            {form.name.charAt(0).toUpperCase()}
          </div>

          <h2>{form.name}</h2>
          <p>Administrator</p>
        </div>

        <form onSubmit={updateProfile}>
          <div className="admin-input-group">
            <label>Name</label>

            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="admin-input-group">
            <label>Email</label>

            <input name="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="admin-input-group">
            <label>Phone</label>

            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>

        

          <button className="profile-update-btn" type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
