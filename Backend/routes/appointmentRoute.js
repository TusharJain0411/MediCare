const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifytoken");

const {
  bookAppointment,
  getDoctorAppointments,
  getUserAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
  getTodayAppointments,
  getDoctorDashboard
  
} = require("../controllers/appointmentController");


// User
router.post("/book", verifyToken, bookAppointment);

router.get("/user", verifyToken, getUserAppointments);

// Doctor
router.get("/doctor", verifyToken, getDoctorAppointments);

router.put("/approve/:id", verifyToken, approveAppointment);

router.put("/reject/:id", verifyToken, rejectAppointment);

router.put("/complete/:id", verifyToken, completeAppointment);

router.get("/today", verifyToken, getTodayAppointments);

router.get("/dashboard", verifyToken, getDoctorDashboard);

module.exports = router;
