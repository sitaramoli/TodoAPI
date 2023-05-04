import express from "express";
import { getUserDetails, login, logout, register } from "../controllers/UserController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.route('/profile')
    .get(isAuthenticated, getUserDetails);

router.route('/logout')
    .get(logout);

export default router;