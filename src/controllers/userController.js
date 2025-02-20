import User from "../models/userModel.js"; // importing user models

// search for all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // dont show the password in answers
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error to find users", error });
  }
};
