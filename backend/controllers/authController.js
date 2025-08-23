import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  generateToken(res, user._id);
  res.json({ _id: user._id, email: user.email, role: user.role });
};

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  const exists = await User.findOne({ email });

  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password, role });
  generateToken(res, user._id);

  res.status(201).json({ _id: user._id, email: user.email, role: user.role });
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out" });
};
