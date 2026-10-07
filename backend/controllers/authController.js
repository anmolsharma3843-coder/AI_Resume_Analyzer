import { user } from '../models/user.js';
import bcrypt from 'bcrypt'
import { generateToken } from '../utilites/generateToken.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    // Check if user already exists
    const existing_user = await user.findOne({ email });
    if (existing_user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hash_password = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await user.create({
      username,
      email,
      password: hash_password,
    });

    // ✅ Generate token and set cookie
    const token = generateToken(res, newUser);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token, // optional: return token in body too
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//login api 

export const userLogin = async (req, res) => {
  try {
    console.log("Login request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the details" });
    }

    const existing_user = await user.findOne({ email });
    if (!existing_user) {
      return res.status(400).json({ message: "Please create an account" });
    }

    const checkPassword = await bcrypt.compare(password, existing_user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Please enter correct password" });
    }

    // ✅ Generate token and set cookie
    const token = generateToken(res, existing_user);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existing_user._id,
        username: existing_user.username,
        email: existing_user.email,
      },
      token, // optional: return token in body too
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//logout controller

export const userLogout=async(req,res)=>{
   res.status(200).send({message:"Log out Successfully!"})
}