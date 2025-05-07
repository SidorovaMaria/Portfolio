// Signup & login logic
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	const { email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) return res.status(400).json({ msg: "User already exists" });
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({ email, password: hashedPassword });
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN);
	res.json({ token });
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ msg: "Invalid credentials" });

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_TOKEN);
	res.json({ token });
};
export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ msg: "User not found" });
		res.json(user);
	} catch (error) {
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};
// controllers/userController.js
export const setProfile = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ msg: "No file uploaded" });
		}

		console.log("File received:", req.file);

		const user = await User.findById(req.userId);
		if (!user) return res.status(404).json({ msg: "User not found" });

		const { name } = req.body;
		if (name) user.name = name;
		console.log("Updating user:", user);

		// Handle image upload
		user.profileImg = {
			data: req.file.buffer,
			contentType: req.file.mimetype,
		};

		await user.save();
		res.json({ msg: "Profile updated successfully", user });
	} catch (error) {
		res.status(500).json({ msg: "Server error", error: error.message });
	}
};
