import { Router } from "express";
import { loginStudent, registerStudent } from "../controller/authController.js";


const router = Router()

router

    .post("/register", registerStudent)
    .post("/login", loginStudent)

export default router