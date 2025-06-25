import "dotenv/config";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import ImageKit from "imagekit";
import jwt from "jsonwebtoken";
import Touch from "../models/contact.model.js";


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: "lax", // lax is safer for production
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });


    // Send response without password
    const { password: _, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userData,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Contact = async(req, res) => {
    try {
        const {name,email,message,reason} = req.body;
        const contact = await Touch.create({name,email,message,reason});
        res.status(200).json({success: true, message: "Message sent successfully",contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

export const GetContact = async(req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

        if(!user.isAdmin){
            return res.status(400).json({success: false, message: "User not found" });
        }
        const contact = await Touch.find();
        res.status(200).json({success: true, message: "Message sent successfully",contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

export const DeleteContact = async(req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

        if(!user.isAdmin){
            return res.status(400).json({success: false, message: "User not found" });
        }
        const contact = await Touch.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Message deleted successfully",contact });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

export const CheckAuth = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user.isAdmin){
            return res.status(400).json({success: false, message: "User not found" });
        }

        res.status(200).json({success: true, message: "User logged in successfully",user });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}

export const Upload = async(req, res) => {
    const imagekit = new ImageKit({
        urlEndpoint: process.env.IK_URL_ENDPOINT,
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
    });

    try {
        const result = imagekit.getAuthenticationParameters();

     res.status(200).json({
        success: true,
        message: "Upload auth successful",
        signature: result.signature,
        expire: result.expire,
        token: result.token,
        publicKey: process.env.IK_PUBLIC_KEY,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message });
    }
}