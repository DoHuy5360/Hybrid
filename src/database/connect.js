import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB Atlas Successfully!");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB Atlas", error);
	});

export default mongoose;
