import axios from "axios";

export const LoginUser = (data) => {
  return axios.post(`http://localhost:1300/medicare/user/login`, data);
};

export const verifyUserToken = (token) => {
  return axios.get(`http://localhost:1300/medicare/user/verify-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const RegisteUser = (data) => {
  return axios.post("http://localhost:1300/medicare/user/register", data);
};

export const logoutUser = (token) => {
  return axios.post(
    "http://localhost:1300/medicare/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getProfile = (token) => {
  return axios.get(`http://localhost:1300/medicare/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = (token) => {
  return axios.get("http://localhost:1300/medicare/user/all-users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (id, token) => {
  return axios.delete(`http://localhost:1300/medicare/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAdmin = (token, form) => {
  return axios.put(
    "http://localhost:1300/medicare/user/profile",
    {
      name: form.name,
      email: form.email,
      phone: form.phone,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getAdmin = (token) => {
  return axios.get("http://localhost:1300/medicare/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNotifications = (token) => {
  return axios.get("http://localhost:1300/medicare/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markAllNotificationsRead = (token) => {
  return axios.put(
    "http://localhost:1300/medicare/user/read-all",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const markNotificationRead = (id, token) => {
  return axios.put(
    `http://localhost:1300/medicare/user/notifications/read/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteAllNotifications = (token) => {
  return axios.delete("http://localhost:1300/medicare/user/delete-all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};