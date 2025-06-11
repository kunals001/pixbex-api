import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

import connectDB from "./config/db.js";


import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js"

app.use("/api/auth", authRoutes);
app.use("/api/post" , postRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
