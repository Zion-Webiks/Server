import { Router } from "express"
import { login, logout, register, tokenCheck } from "../controllers/AuthController"
import verifyUser from "../middleware/verifyUser"

const router = Router()

router.get("/",verifyUser, tokenCheck)

router.post("/register", register)

router.post("/login", login)

router.post("/logout", logout)

export default router