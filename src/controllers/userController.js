import User from "../models/userModel.js"; // Importe o model de usuário

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Busca todos os usuários (sem a senha)
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    console.log("ID do usuário do token:", req.user.id); // Verifique o ID do usuário

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      console.log("Usuário não encontrado no banco de dados."); // Verifique se o usuário existe
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Dados do usuário encontrados:", user); // Verifique os dados do usuário

    res.json(user);
  } catch (error) {
    console.error("Erro na função getProfile:", error); // Log do erro detalhado
    res.status(500).json({ message: "Server error", error: error.message }); // Envia mensagem de erro detalhada (apenas para desenvolvimento)
  }
};
