import "dotenv/config";
import express from "express";
const app = express();


const PORT = process.env.PORT || 5000;

app.use(express.json());

import connectDB from "./config/db.js";


import authRoutes from "./routes/auth.route.js";

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
