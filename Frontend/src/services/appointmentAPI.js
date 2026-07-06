//appointmentAPI.js

import axios from "axios";

const BASE = "http://localhost:1300/medicare/appointment";

export const bookAppointment = (data, token) =>
  axios.post(`${BASE}/book`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDoctorAppointments = (token) =>
  axios.get(`${BASE}/doctor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserAppointments = (token) =>
  axios.get(`${BASE}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveAppointment = (id, token) =>
  axios.put(
    `${BASE}/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const rejectAppointment = (id, token) =>
  axios.put(
    `${BASE}/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const completeAppointment = (id, token) =>
  axios.put(
    `${BASE}/complete/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const getTodayAppointments = (token) => {
  return axios.get(`${BASE}/today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDoctorDashboard = (token) => {
  return axios.get(`${BASE}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};