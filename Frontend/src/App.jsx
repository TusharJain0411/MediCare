import { loginSuccess } from "./redux/slices/userSlice";

import react, {  useEffect } from "react";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./CSS/Login_register.css";
import { Toaster } from "react-hot-toast";
import { getProfile } from "./services/userAuth";
import Layout from "./pages/Layout";
import Login_Register from "./pages/Login_Register";

import ProtectedRoute from "./components/ProtectedRoute";
import ApplyDoctor from "./components/ContentBody/ApplyDoctor";
import Notification from "./components/ContentBody/Notification";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/ContentBody/Home/Home";
import DoctorsList from "./components/DoctorsList";
import AdminProfile from "./components/AdminProfile";
import UsersList from "./components/UsersList";
import DoctorProfile from "./components/DoctorProfile";
import DoctorAppointment from "./components/ContentBody/Appointment/DoctorAppointment";
import UserAppointment from "./components/ContentBody/Appointment/UserAppointment";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await getProfile(token);

        dispatch(
          loginSuccess({
            token,
            user: res.data.user,
          }),
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <div className="Main-app">
        <Routes>
          <Route path="/" element={<Login_Register />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctorappointment"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorAppointment />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/userappointment"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserAppointment />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/applydoctor"
            element={
              <ProtectedRoute>
                <Layout>
                  <ApplyDoctor />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <Layout>
                  <Notification />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctorslist"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorsList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/adminprofile"
            element={
              <ProtectedRoute>
                <Layout>
                  <AdminProfile />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/userslist"
            element={
              <ProtectedRoute>
                <Layout>
                  <UsersList />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctorprofile"
            element={
              <ProtectedRoute>
                <Layout>
                  <DoctorProfile />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
