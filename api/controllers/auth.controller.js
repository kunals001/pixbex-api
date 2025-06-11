import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async(req, res) => {
   try {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({success: false, message: "Please enter email and password" });
    }

    const user = await User.findOne({email}).select("-password")

    if(!user){
        return res.status(400).json({success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10d",
      },
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      })
    );

    res.status(200).json({success: true, message: "User logged in successfully",user });
    
   } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: error.message });
   }
};