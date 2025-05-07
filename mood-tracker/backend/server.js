import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import the database connection
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(
	cors({
		origin: "http://localhost:5173", // Allow only this frontend URL
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(express.json());

// Import routes using import
import authRoutes from "./routes/authRoutes.js";
import moodRoutes from "./routes/moodRoutes.js";

app.use("/api/users", authRoutes);
app.use("/api/moods", moodRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
