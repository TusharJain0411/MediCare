const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Notification = require("../models/Notification");


const applyDoctor = async (req, res) => {
  try {
    const {
      qualification,
      specialization,
      experience,
      consultationFee,
      hospitalName,
      availableFrom,
      availableTo,
      availableDays,
      address,
      description,
    } = req.body;

    const alreadyApplied = await Doctor.findOne({
      user: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Application already submitted",
      });
    }

    const doctor = await Doctor.create({
      qualification,
      specialization,
      experience,
      consultationFee,
      hospitalName,
      availableFrom,
      availableTo,
      availableDays,
      address,
      description,
      user: req.user.id,
    });
    

    const admins = await User.find({ isAdmin: true });

    const notifications = admins.map((admin) => ({
      receiver: admin._id,
      sender: req.user.id,
      title: "New Doctor Application",
      message: "A new doctor application has been submitted.",
      type: "info",
      link:"/doctorslist"
    }));

    await Notification.insertMany(notifications);


    res.status(201).json({
      success: true,
      message: "Application Submitted",
      doctor,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Application Not Found",
      });
    }

    doctor.status = "Approved";
    await doctor.save();

    await User.findByIdAndUpdate(doctor.user, {
      isDoctor: true,
    });



    doctor.status = "Approved";
    await doctor.save();

    await User.findByIdAndUpdate(doctor.user, {
      isDoctor: true,
    });

    await Notification.create({
      receiver: doctor.user,
      sender: req.user.id, 
      title: "Application Approved",
      message: "Congratulations! Your doctor application has been approved.",
      type: "success",
      link: "/home",
    });

    res.status(200).json({
      success: true,
      message: "Doctor Approved",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const rejectDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Application Not Found",
      });
    }

    doctor.status = "Rejected";
    await doctor.save();

    await User.findByIdAndUpdate(doctor.user, {
      isDoctor: false,
    });


    await Notification.create({
      receiver: doctor.user,
      sender: req.user.id,
      title: "Application Rejected",
      message: "Your doctor application has been rejected.",
      type: "danger",
      link: "/home",
    });


    res.status(200).json({
      success: true,
      message: "Doctor Rejected",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await User.findByIdAndUpdate(doctor.user, {
      isDoctor: false,
    });

    await Doctor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user.id,
      status: "Approved",
    }).populate("user", "name email phone");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const {
      qualification,
      specialization,
      experience,
      consultationFee,
      hospitalName,
      address,
      description,
      fullName,
    } = req.body;

    const doctor = await Doctor.findOne({
      user: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    await User.findByIdAndUpdate(req.user.id, {
      name: fullName,
    });

    doctor.qualification = qualification;
    doctor.specialization = specialization;
    doctor.experience = experience;
    doctor.consultationFee = consultationFee;
    doctor.hospitalName = hospitalName;
    doctor.address = address;
    doctor.description = description;
        

  if (req.file) {
    console.log("REQ.FILE:");
    console.log(req.file);

    doctor.profileImage = req.file.path;
  }



    await doctor.save();

    await doctor.populate("user", "name email phone");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      doctor,
    });
  } catch (err) {
    console.error(err);
    

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getRecentDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name")
      .sort({ createdAt: -1 }) 
      .limit(5);

    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};





 


module.exports = {
  applyDoctor,
  getAllDoctors,
  approveDoctor,
  rejectDoctor,
  deleteDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getRecentDoctors,

};
