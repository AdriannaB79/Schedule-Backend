import mongoose from "mongoose";

const ShiftSchema = new mongoose.Schema({
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  shiftType: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

export default mongoose.model("Shift", ShiftSchema);
