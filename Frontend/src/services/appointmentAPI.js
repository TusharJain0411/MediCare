//appointmentAPI.js

import API from "./api";

const BASE = "/medicare/appointment";

export const bookAppointment = (data, token) =>
  API.post(`${BASE}/book`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getDoctorAppointments = (token) =>
  API.get(`${BASE}/doctor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserAppointments = (token) =>
  API.get(`${BASE}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveAppointment = (id, token) =>
  API.put(
    `${BASE}/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const rejectAppointment = (id, token) =>
  API.put(
    `${BASE}/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const completeAppointment = (id, token) =>
  API.put(
    `${BASE}/complete/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

export const getTodayAppointments = (token) => {
  return API.get(`${BASE}/today`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDoctorDashboard = (token) => {
  return API.get(`${BASE}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};