const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      isAdmin: false,
      isDoctor: false,
    });

    const totalDoctors = await Doctor.countDocuments({
      status: "Approved",
    });

    const pendingApplications = await Doctor.countDocuments({
      status: "Pending",
    });

    const totalApplications = await Doctor.countDocuments();

    const totalAppointments = await Appointment.countDocuments();

    const completedAppointments = await Appointment.countDocuments({
      status: "Completed",
    });

    const doctorApprovalRate =
      totalApplications === 0
        ? 0
        : Math.round((totalDoctors / totalApplications) * 100);

    const appointmentSuccessRate =
      totalAppointments === 0
        ? 0
        : Math.round((completedAppointments / totalAppointments) * 100);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalDoctors,
        pendingApplications,
        doctorApprovalRate,
        appointmentSuccessRate,
        platformUptime: 99,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};
