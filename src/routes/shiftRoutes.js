import express from "express";
import Shift from "../models/Shift.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const shift = new Shift({ ...req.body, nurseId: req.user.id });
    await shift.save();
    res.status(201).json(shift);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const shifts = await Shift.find({ nurseId: req.user.id });
  res.json(shifts);
});

export default router;
