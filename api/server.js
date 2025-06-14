import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}))


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

import connectDB from "./config/db.js";


import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js"
import hireRoutes from "./routes/hire.route.js"

app.use("/api/auth", authRoutes);
app.use("/api/post" , postRoutes);
app.use("/api/hire" , hireRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
