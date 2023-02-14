import mongoose from "../connect.js";

const file_schema = new mongoose.Schema({
	_belong: String,
	name: String,
});

const file_model = new mongoose.model("files", file_schema);

export default file_model;
