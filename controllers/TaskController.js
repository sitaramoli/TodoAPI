import ErrorHandler from "../middlewares/ErrorHandler.js";
import { createTaskService, deleteTaskService, fetchAllTasksService, updateTaskService } from "../services/tasks.services.js";

export const addTask = async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description)
        next(new ErrorHandler('All fields are required', 400));
    try {
        await createTaskService({ title, description, user: req.user });
        res.status(201).json({
            success: true,
            message: "Task created"
        });
    } catch (error) {
        next(error);
    }
}

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await fetchAllTasksService({ user: req.user });
        res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const success = await updateTaskService({ id });
        if (!success)
            return next(new ErrorHandler('Task does not exist', 404));

        res.status(200).json({
            success: true,
            message: 'Updated'
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const success = await deleteTaskService({ id });
        if (!success)
            return next(new ErrorHandler('Task does not exist', 404));

        res.status(200).json({
            success: true,
            message: 'Deleted'
        });
    } catch (error) {
        next(error);
    }
}