import { user } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // cookie-parser makes this available
    console.log("Cookies:", req.cookies);
    if (!token) {
      return res.status(401).json({ success: false, message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await user.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
