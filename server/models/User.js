const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    fname: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    mobile: {
      type: String,
      required: true
    },

    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true
    },

    course: {
      type: String,
      required: true
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true
    },

    enrollment: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    dob: {
      type: Date,
      required: true
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true
    },

    address: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["active", "inactive", "delete" , "blocked"],
      default: "active"
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);