import API from "./api";

const BASE = "/medicare/doctor";

export const applyDoctor = (data, token) =>
  API.post(`${BASE}/apply`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllDoctors = (token) =>
  API.get(`${BASE}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveDoctor = (id, token) =>
  API.put(
    `${BASE}/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const rejectDoctor = (id, token) =>
  API.put(
    `${BASE}/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const deleteDoctor = (id, token) =>
  API.delete(`${BASE}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDoctorProfile = (token) =>
  API.get(`${BASE}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateDoctorProfile = (data, token) => {
  return API.put(`${BASE}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getRecentDoctors = (token) => {
  return API.get("/medicare/doctor/recent", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


