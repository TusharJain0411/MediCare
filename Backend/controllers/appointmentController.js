const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const createNotification = require("../utils/createNotification");
const User = require("../models/User");


const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, disease } = req.body;

    if (!doctorId || !date || !time || !disease) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (doctor.status !== "Approved") {
      return res.status(400).json({
        success: false,
        message: "Doctor is not available",
      });
    }


    const convertToMinutes = (t) => {
      const [hour, minute] = t.split(":").map(Number);
      return hour * 60 + minute;
    };

    const appointmentDate = new Date(date);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const appointmentDay = days[appointmentDate.getDay()];

    if (!doctor.availableDays.includes(appointmentDay)) {
      return res.status(400).json({
        success: false,
        message: `Doctor is not available on ${appointmentDay}.`,
      });
    }

    const requestedTime = convertToMinutes(time);
    const availableFrom = convertToMinutes(doctor.availableFrom);
    const availableTo = convertToMinutes(doctor.availableTo);


    if (requestedTime < availableFrom || requestedTime > availableTo) {
      return res.status(400).json({
        success: false,
        message: `Doctor is available only between ${doctor.availableFrom} and ${doctor.availableTo}.`,
      });
    }

 
    const approvedAppointments = await Appointment.find({
      doctor: doctorId,
      date,
      status: "Approved",
    });

    for (const appointment of approvedAppointments) {
      const bookedTime = convertToMinutes(appointment.time);

      const difference = Math.abs(bookedTime - requestedTime);

      if (difference < 60) {
        return res.status(400).json({
          success: false,
          message:
            "Doctor already has an appointment within 1 hour. Please choose another time.",
        });
      }
    }

    const newAppointment = await Appointment.create({
      user: req.user.id,
      doctor: doctorId,
      disease,
      date,
      time,
    });


    await createNotification(
      doctor.user,
      req.user.id,
      "New Appointment Request",
      "A patient has booked an appointment with you.",
      "info",
      "/doctorappointment",
      newAppointment._id,
    );



    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.id,
    })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email phone",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const approveAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Approved";

    await appointment.save();


     const doctor = await Doctor.findById(appointment.doctor);

     await createNotification(
       appointment.user,
       doctor.user,
       "Appointment Approved",
       "Your appointment has been approved by the doctor.",
       "success",
       "/userappointment",
       appointment._id,
     );


    res.status(200).json({
      success: true,
      message: "Appointment Approved",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const rejectAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.status = "Rejected";

    await appointment.save();
    

    const doctor = await Doctor.findById(appointment.doctor);

    await createNotification(
      appointment.user,
      doctor.user,
      "Appointment Rejected",
      "Your appointment has been rejected by the doctor.",
      "danger",
      "/userappointment",
      appointment._id,
    );


    res.status(200).json({
      success: true,
      message: "Appointment Rejected",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Prevent duplicate increments
    if (appointment.status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Appointment is already completed",
      });
    }

    appointment.status = "Completed";
    await appointment.save();

    // Increase user's completed appointment count by 1
    await User.findByIdAndUpdate(
      appointment.user,
      {
        $inc: { totalAppointments: 1 },
      },
      { new: true },
    );

    const doctor = await Doctor.findById(appointment.doctor);

    await createNotification(
      appointment.user,
      doctor.user,
      "Appointment Completed",
      "Your appointment has been marked as completed.",
      "success",
      "/userappointment",
      appointment._id,
    );

    res.status(200).json({
      success: true,
      message: "Appointment Completed",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getTodayAppointments = async (req, res) => {
   try {
     const doctor = await Doctor.findOne({ user: req.user.id });

     if (!doctor) {
       return res.status(404).json({
         success: false,
         message: "Doctor not found",
       });
     }

     const today = new Date().toISOString().split("T")[0];

     const appointments = await Appointment.find({
       doctor: doctor._id,
       date: today,
     })
       .populate("user", "name")
       .sort({ time: 1 });

     res.status(200).json({
       success: true,
       appointments,
     });
   } catch (err) {
     console.log(err);
     res.status(500).json({
       success: false,
       message: "Server Error",
     });
   }
 };



const getDoctorDashboard = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    // Top Cards
    const todayAppointments = await Appointment.countDocuments({
      doctor: doctor._id,
      date: today,
    });

    const pendingRequests = await Appointment.countDocuments({
      doctor: doctor._id,
      status: "Pending",
    });

    const completedAppointments = await Appointment.countDocuments({
      doctor: doctor._id,
      status: "Completed",
    });

    const totalPatients = (
      await Appointment.distinct("user", {
        doctor: doctor._id,
        status: "Completed",
      })
    ).length;

    // This Week
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);

    const appointmentsThisWeek = await Appointment.countDocuments({
      doctor: doctor._id,
      createdAt: { $gte: weekStart },
    });

    // Profile Completion
    let completedFields = 0;

    if (doctor.profileImage) completedFields++;
    if (doctor.specialization) completedFields++;
    if (doctor.experience) completedFields++;
    if (doctor.degree) completedFields++;
    if (doctor.hospital) completedFields++;
    if (doctor.fee) completedFields++;
    if (doctor.availableDays?.length) completedFields++;
    if (doctor.availableFrom) completedFields++;
    if (doctor.availableTo) completedFields++;

    const totalFields = 9;

    const profileCompletion = Math.round((completedFields / totalFields) * 100);

    res.status(200).json({
      success: true,
      stats: {
        todayAppointments,
        pendingRequests,
        completedAppointments,
        totalPatients,
        appointmentsThisWeek,
        profileCompletion,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getDoctorDashboard,
};


module.exports = {
  bookAppointment,
  getDoctorAppointments,
  getUserAppointments,
  approveAppointment,
  rejectAppointment,
  completeAppointment,
  getTodayAppointments,
  getDoctorDashboard
};