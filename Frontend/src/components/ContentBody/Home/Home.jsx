import React from "react";
import { useSelector } from "react-redux";
import UserHome from "./UserHome";
import AdminDashboard from "./AdminDashboard";
import DoctorHome from "./DoctorHome";

function Home() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return currentUser?.isAdmin ? (
    <AdminDashboard />
  ) : currentUser?.isDoctor ? (
    <DoctorHome />
  ) : (
    <UserHome />
  );
}

export default Home;
