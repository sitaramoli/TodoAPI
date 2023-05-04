import express from "express";
import { addTask, deleteTask, getAllTasks, updateTask } from "../controllers/TaskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route('')
    .get(isAuthenticated, getAllTasks)
    .post(isAuthenticated, addTask);
router.route('/:id')
    .put(isAuthenticated, updateTask)
    .delete(isAuthenticated, deleteTask);

export default router;