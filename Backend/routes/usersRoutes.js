const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
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
  deleteAllNotifications,
} = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifytoken");



router.post("/login", getLogin);

router.get("/verify-token", verifyToken, getVerifyToken);

router.post("/register", register);

router.post("/logout", verifyToken, logout);

router.get("/profile", verifyToken, Profile);

router.get("/all-users", verifyToken, getAllUsers);

router.delete("/delete/:id", verifyToken, deleteUser);

router.put("/profile", verifyToken, updateProfile);

router.get("/", verifyToken, getNotifications);

router.put("/read-all", verifyToken, markAllRead);

router.put("/notifications/read/:id", verifyToken, markNotificationRead);

router.delete("/delete-all", verifyToken, deleteAllNotifications);

module.exports = router;
