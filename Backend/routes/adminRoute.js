const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifytoken");


const { getDashboardStats }=require("../controllers/adminController");

router.get("/dashboard", verifyToken, getDashboardStats);


module.exports = router;