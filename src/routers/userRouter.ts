import { Router } from "express";
import { UserController } from "../controllers/UserController";
import  verifyUser  from "../middleware/verifyUser";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
//router.get("/profile", verifyUser, UserController.getProfile);

export default router;
