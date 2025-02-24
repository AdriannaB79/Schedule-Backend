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

router.post("/", createUser); // Rota de registro (sem middleware)

router.use(authMiddleware); // Middleware aplicado *após* a rota de registro

router.get("/", getAllUsers);
router.get("/me", getMe);
router.get("/:id", getOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
