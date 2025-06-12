import { Router } from "express";
import { login, Register, FindOwnUser, Logout } from "../controllers/UserController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", Register);
router.get("/find-own-user", isAuthenticated, FindOwnUser);
router.get("/logout",isAuthenticated,Logout)

export default router;
