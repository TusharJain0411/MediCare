const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");
const Notification=require("../models/Notification"); 


const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};



const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }



    const token = generateToken(user);
    user.token = token;
    await user.save();
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getVerifyToken = async (req, res) => {
  res.json({ success: true, message: "Token is valid", user: req.user });
};



const register = async (req, res) => {

  try {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Request body is undefined",
    });
  }
 
    const { name, email, phone, password } =
      req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
       const hashedPassword = await bcrypt.hash(password, 10);
  
await User.create({
  name,
  email,
  phone,
  password: hashedPassword,

});

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: "" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      isAdmin: false,
      isDoctor: false,
    })
      .select("-password -token")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await Doctor.deleteOne({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingPhone = await User.findOne({
      phone,
      _id: { $ne: req.user.id },
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
      },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.user.id,
    })
      .populate("sender", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const markAllRead = async (req, res) => {
  await Notification.updateMany({ receiver: req.user.id }, { isRead: true });

  res.json({
    success: true,
  });
};

const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, {
      isRead: true,
    });

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({
      receiver: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "All notifications deleted",
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
  getLogin,
  getVerifyToken,
  register,
  logout,
  Profile,
  getAllUsers,
  deleteUser,
  updateProfile,
  getNotifications,
  markAllRead,
  markNotificationRead,
  deleteAllNotifications
};