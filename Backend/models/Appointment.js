const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    
    disease: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    
    date: {
      type: Date,
      required: true,
    },

    
    time: {
      type: String,
      required: true,
    },

  
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
