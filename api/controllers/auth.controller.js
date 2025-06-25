import "dotenv/config";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import ImageKit from "imagekit";
import Touch from "../models/contact.model.js";
import {generateToken} from "../utils/generateToken.js"


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(res, user._id);

    const { password: _, ...userData } = user._doc;
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const Logout = async (req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({success:true,message:"User signed out"})
    } catch (error) {
        console.log("error in signout",error.message);
        res.status(500).json({success:false,message:"Internal Server Error in signout"})
    }
}

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