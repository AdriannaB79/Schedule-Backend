import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Funtion generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", // one hour
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, department, nurseType, institution } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      department,
      nurseType,
      institution,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id); // using function token

    // Aqui, alteramos para incluir todos os campos do usuário
    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        gender: user.gender, // Adicionando o campo 'gender'
        phoneNumber: user.phoneNumber, // Adicionando o campo 'phoneNumber'
        country: user.country, // Adicionando o campo 'country'
        city: user.city, // Adicionando o campo 'city'
        street: user.street, // Adicionando o campo 'street'
        zipCode: user.zipCode, // Adicionando o campo 'zipCode'
        contractDetails: user.contractDetails, // Adicionando o campo 'contractDetails'
        dateOfBirth: user.dateOfBirth, // Adicionando o campo 'dateOfBirth'
        medicalId: user.medicalId, // Adicionando o campo 'medicalId'
        avatar: user.avatar, // Adicionando o campo 'avatar'
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
