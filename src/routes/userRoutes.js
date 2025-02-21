import express from "express";
import { getProfile, getAllUsers } from "../controllers/userController.js"; // Importe as funções do controller
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllUsers); // Rota para listar todos os usuários (não protegida)

router.get("/menu-profile", authMiddleware, getProfile); // Rota protegida para o perfil

export default router;
