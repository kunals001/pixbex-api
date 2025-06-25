import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  const isProduction = process.env.NODE_ENV === "production"

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, 
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};
