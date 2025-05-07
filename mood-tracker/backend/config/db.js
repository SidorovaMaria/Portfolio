// Mongo DB Configuration
import mongoose from "mongoose";
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected");
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

export default connectDB;
// This code connects to a MongoDB database using Mongoose. It exports a function `connectDB` that attempts to connect to the database using the URI stored in the environment variable `MONGODB_URI`. If the connection is successful, it logs "MongoDB connected" to the console. If there is an error, it logs the error message and exits the process with a status code of 1.
