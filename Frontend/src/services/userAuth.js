import API from "./api";

export const LoginUser = (data) => {
  return API.post(`/medicare/user/login`, data);
};

export const verifyUserToken = (token) => {
  return API.get(`/medicare/user/verify-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const RegisteUser = (data) => {
  return API.post("/medicare/user/register", data);
};

export const logoutUser = (token) => {
  return API.post(
    "/medicare/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getProfile = (token) => {
  return API.get(`/medicare/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = (token) => {
  return API.get("/medicare/user/all-users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (id, token) => {
  return API.delete(`/medicare/user/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAdmin = (token, form) => {
  return API.put(
    "/medicare/user/profile",
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
  return API.get("/medicare/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getNotifications = (token) => {
  return API.get("/medicare/user/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markAllNotificationsRead = (token) => {
  return API.put(
    "/medicare/user/read-all",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const markNotificationRead = (id, token) => {
  return API.put(
    `/medicare/user/notifications/read/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteAllNotifications = (token) => {
  return API.delete("/medicare/user/delete-all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
