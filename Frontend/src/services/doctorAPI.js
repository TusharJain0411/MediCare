import axios from "axios";

const BASE = "http://localhost:1300/medicare/doctor";

export const applyDoctor = (data, token) =>
  axios.post(`${BASE}/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllDoctors = (token) =>
  axios.get(`${BASE}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveDoctor = (id, token) =>
  axios.put(
    `${BASE}/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const rejectDoctor = (id, token) =>
  axios.put(
    `${BASE}/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const deleteDoctor = (id, token) =>
  axios.delete(`${BASE}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDoctorProfile = (token) =>
  axios.get(`${BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateDoctorProfile = (data, token) => {
  return axios.put(`${BASE}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRecentDoctors = (token) => {
  return axios.get("http://localhost:1300/medicare/doctor/recent", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardStats = (token) => {
  return axios.get("http://localhost:1300/medicare/doctor/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};