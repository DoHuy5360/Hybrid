import mongoose from "mongoose";

mongoose
	.connect("mongodb+srv://hybrid:ilGyIKlEcu0kPnPW@cluster0.2wso698.mongodb.net/file_database?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to MongoDB Atlas Successfully!");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB Atlas", error);
	});

export default mongoose;
