// routes/user.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/user");

const router = express.Router();

// Trasa do rejestracji użytkownika
router.post("/register", registerUser);

// Trasa do logowania użytkownika
router.post("/login", loginUser);

module.exports = router;
