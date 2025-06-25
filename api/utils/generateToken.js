import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res, userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"});

    res.cookie("token", token ,{
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 15 * 24 * 60 * 60 * 1000,
    })
}