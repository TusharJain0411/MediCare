
import axios from "axios";

export const getDashboardStats = (token) => {
  return axios.get("http://localhost:1300/medicare/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
