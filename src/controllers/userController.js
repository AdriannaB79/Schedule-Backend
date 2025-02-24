import User from "../models/userModel.js"; // Importa o modelo de usuário

// user withou password
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users.length) {
      return res.status(200).json({ msg: "No users found in the DB" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get specific user
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getOneUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// create new user
export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      userType,
      gender,
      department,
      institution,
      country,
      city,
      street,
      zipCode,
      phoneNumber,
      contractDetails,
      dateOfBirth,
      medicalId,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userType,
      gender,
      department,
      institution,
      country,
      city,
      street,
      zipCode,
      phoneNumber,
      contractDetails,
      dateOfBirth,
      medicalId,
    });

    await newUser.save();

    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update specific user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      country,
      city,
      street,
      zipCode,
      contractDetails,
      dateOfBirth,
      medicalId,
    } = req.body;

    const updates = {};

    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) updates.email = email;
    if (gender) updates.gender = gender;
    if (phoneNumber) updates.phoneNumber = phoneNumber;
    if (country) updates.country = country;
    if (city) updates.city = city;
    if (street) updates.street = street;
    if (zipCode) updates.zipCode = zipCode;
    if (contractDetails) updates.contractDetails = contractDetails;
    if (dateOfBirth) updates.dateOfBirth = dateOfBirth;
    if (medicalId) updates.medicalId = medicalId;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// delete specific user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Recebida solicitação para deletar o usuário com ID: ${id}`);

    const deletedUser = await User.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log("Usuário deletado com sucesso!");
    res
      .status(200)
      .json({ msg: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get the user profile (already authenticated)
export const getMe = async (req, res) => {
  try {
    console.log("User ID from token:", req.user.id);

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getMe:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
