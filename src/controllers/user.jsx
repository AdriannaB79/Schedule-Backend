// controllers/userController.js
const User = require("../schema/userSchema");

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  const { userType, name, email, phone, password, contractDetail } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "We already have an account with this email" });
    }

    const newUser = new User({
      userType,
      name,
      email,
      phone,
      password,
      contractDetail,
    });
    await newUser.save();

    res.status(201).json({ message: "Succeed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

// Logowanie użytkownika
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Wrong email or password!" });
    }

    res.status(200).json({ message: "Log In succeed!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
