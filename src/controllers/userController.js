import User from "../models/userModel.js"; // Importa o modelo de usuário

// 🔹 Obter todos os usuários (sem senha)
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

// 🔹 Obter um usuário específico pelo ID
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

// 🔹 Criar um novo usuário
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    // Verifica se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already in use" });
    }

    // Cria novo usuário
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      userType,
    });
    await newUser.save();

    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 Atualizar um usuário pelo ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      gender, // Adicione todos os campos aqui
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

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true } // Retorna o documento atualizado
    ).select("-password");

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

// 🔹 Deletar um usuário pelo ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🔹 Obter perfil do usuário autenticado (com base no token)
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
