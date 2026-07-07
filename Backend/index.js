require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DBConnect = require("./db/dbConfig");
const path = require("path");

DBConnect();
const PORT = process.env.PORT||1300;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/medicare/user",require("./routes/usersRoutes"));

app.use("/medicare/doctor", require("./routes/doctorRoutes"));

app.use("/medicare/admin",require("./routes/adminRoute"));


app.use("/medicare/appointment", require("./routes/appointmentRoute"));

app.get("/", (req, res) => {
  res.send("MediCare Backend is Running 🚀");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
