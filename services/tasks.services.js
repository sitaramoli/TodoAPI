import ErrorHandler from "../middlewares/ErrorHandler.js";
import { TaskModel } from "../models/TaskModel.js";

export const createTaskService = async ({ title, description, user }) => {
    try {
        return await TaskModel.create({ title, description, user });
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
}

export const fetchAllTasksService = async ({ user }) => {

    try {
        const tasks = await TaskModel.find({ user: user });
        let data = [];
        tasks.forEach((task) => {
            data.push({
                id: task._id,
                title: task.title,
                description: task.description,
                completed: task.completed,
                createdAt: task.createdAt
            });
        });
        return data;
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
}

export const updateTaskService = async ({ id }) => {
    try {
        let task = await TaskModel.findById(id);
        if (!task) return false;
        task.completed = !task.completed;
        await task.save();
        return true;
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);

    }
}

export const deleteTaskService = async ({ id }) => {
    try {
        let task = await TaskModel.findById(id);
        if (!task) return false;
        await task.deleteOne();
        return true;
    } catch (error) {
        throw new ErrorHandler("Internal Server Error", 500);
    }
}