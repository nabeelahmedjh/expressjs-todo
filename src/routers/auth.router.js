import express from "express";
import { registerUser, login } from "../controllers/user.controller.js";


const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);

export { authRouter };
