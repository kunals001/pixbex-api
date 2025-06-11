import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import "dotenv/config";

export const protectRoute = async(req, res, next) => {
	 
	const token = req.cookies.token;
	if (!token) return res.status(401).json({ success: false, message: "Unauthorized token" });
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
        
		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized" });

		if (!user) return res.status(401).json({ success: false, message: "Unauthorized user" });

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error in verifyToken" });
	}
};