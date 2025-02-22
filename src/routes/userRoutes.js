import express from "express";
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getMe,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Rotas públicas
router.get("/", getAllUsers); // Listar todos os usuários

// 🔹 Rotas protegidas (precisam de autenticação)
router.get("/me", authMiddleware, getMe); // Perfil do usuário autenticado
router.get("/:id", authMiddleware, getOneUser); // Buscar usuário por ID
router.post("/", authMiddleware, createUser); // Criar usuário
router.put("/:id", authMiddleware, updateUser); // Atualizar usuário
router.delete("/:id", authMiddleware, deleteUser); // Deletar usuário

export default router;
