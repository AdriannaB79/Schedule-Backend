// schema/userSchema.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contractDetail: {
      type: String,
      required: true,
      enum: ["staff nurse", "out-patient nurse", "ward nurse"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.schema("User", userSchema);
module.exports = User;
