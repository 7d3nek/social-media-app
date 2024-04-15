const express = require("express");
const router = express.Router();
import { loginUser, signupUser } from "../controllers/userController";

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);