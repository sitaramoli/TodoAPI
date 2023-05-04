import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import { findUser, registerUser } from "../services/users.services.js";
import { sendAuthResponse } from "../utils/auth.js";

//get user details
export const getUserDetails = async (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            name: req.user.name,
            email: req.user.email
        }
    })
};

//register user
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        next(new ErrorHandler("All fields are required", 400));
    try {
        let user = await findUser({ email });
        if (user)
            throw new ErrorHandler("User with this email already exists", 409);
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await registerUser({ name, email, password: hashedPassword });
        sendAuthResponse({ res, user, statusCode: 201, message: "Account created successfully" });
    } catch (error) {
        next(error);
    }
};

// login user
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        next(new ErrorHandler("All fields are required", 400));

    try {
        let user = await findUser({ email });
        if (!user)
            throw new ErrorHandler("Invalid email or password", 404);
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            throw new ErrorHandler("Invalid email or password", 404);
        sendAuthResponse({ res, user, statusCode: 200, message: `Welcome back, ${user.name}` });
    } catch (error) {
        next(error);
    }
};

// logout
export const logout = (req, res) => {
    res.status(200).cookie('token', '', {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Dev" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Dev" ? false : true
    }).json({ success: true });
}