import { Router } from "express"
import verifyUser from "../middleware/verifyUser"
import { profile, updateProfile } from "../controllers/UserController"

const router = Router()

router.get("/profile", profile)

router.put("/updateProfile", updateProfile)

export default router;