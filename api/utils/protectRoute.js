import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config";

export const protectRoute = async (req, res, next) => {
	
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); // exclude password

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user to the request
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
