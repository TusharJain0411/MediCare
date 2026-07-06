const mongoose =require( "mongoose");

const doctorSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    consultationFee: {
      type: Number,
      required: true,
      min: 0,
    },

    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    availableFrom: {
      type: String,
      required: true,
    },

    availableTo: {
      type: String,
      required: true,
    },

    availableDays: {
      type: [String],
      required: true,
      validate: {
        validator: function (days) {
          const validDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

          return days.every((day) => validDays.includes(day));
        },
        message: "Invalid day selected",
      },
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);
