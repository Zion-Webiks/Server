import { Router } from "express"
import verifyUser from "../middleware/verifyUser"
import { profile, updateProfile } from "../controllers/userController"

const router = Router()

router.get("/profile", profile)

router.put("/updateProfile", updateProfile)

export default router;