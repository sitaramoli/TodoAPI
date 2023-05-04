import jwt from "jsonwebtoken";
import { findUserById } from "../services/users.services.js";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await findUserById({ id: decodedToken._id });
    next();

}