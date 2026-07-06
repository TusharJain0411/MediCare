import API from "./api";


export const getDashboardStats = (token) => {
  return API.get("/medicare/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
