import ErrorHandler from "../middlewares/ErrorHandler.js";
import { UserModel } from "../models/UserModel.js";

export const findUser = async ({ email }) => {
    try {
        return await UserModel.findOne({ email }).select("+password");
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
};

export const findUserById = async ({ id }) => {
    try {
        return await UserModel.findById(id);

    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
}

export const registerUser = async ({ name, email, password }) => {
    try {
        return await UserModel.create({ name, email, password });
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
};