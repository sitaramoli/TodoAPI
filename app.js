import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/database.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import tasksRouter from "./routes/tasks.js";
import usersRouter from "./routes/users.js";

const app = express();
config();

// DB connection
connectDB();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// routes
app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running at port: ${process.env.PORT}`);
});

app.use(errorHandler);