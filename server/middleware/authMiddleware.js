import jwt from "jsonwebtoken";
import {User} from "../models/user.js"; // make sure your User model is exported as default

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // requires cookie-parser
    if (!token) {
      return res.status(401).json({ success: false, message: "Please login first" });
    }
    // Verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
