import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Reimportando o middleware

const router = express.Router();

router.use(authMiddleware); // Reativando a autenticação

router.get("/", getAllUsers); // Endpoint para listar todos os usuários

export default router;
