const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifytoken");
const upload = require("../middlewares/upload");
const {
  applyDoctor,
  getAllDoctors,
  approveDoctor,
  rejectDoctor,
  deleteDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getRecentDoctors
} = require("../controllers/doctorController");

router.post("/apply", verifyToken, applyDoctor);

router.get("/all", verifyToken, getAllDoctors);

router.put("/approve/:id", verifyToken, approveDoctor);

router.put("/reject/:id", verifyToken, rejectDoctor);

router.delete("/delete/:id", verifyToken, deleteDoctor);

router.get("/profile", verifyToken, getDoctorProfile);

router.put(
  "/profile",
  verifyToken,
  upload.single("profileImage"),
  updateDoctorProfile,
);

router.get("/recent", verifyToken, getRecentDoctors);



module.exports = router;
