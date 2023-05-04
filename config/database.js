import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME }).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log(err);
    });
};