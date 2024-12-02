import express from "express"
import cros from "cors"
import "dotenv/config"
import userRouter from "./routers/userRouter";
import { connectToMongo } from "./config/db";
import verifyUser from "./middleware/verifyUser";
import authRouter from "./routers/authRouter";

const PORT = process.env.PORT || 3000;

const app = express()
connectToMongo()

app.use(express.json())
app.use(cros())

app.use("/api/users",verifyUser, userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () =>  {
  console.log(`Server started, Visit "http://localhost:${PORT}"`);
})