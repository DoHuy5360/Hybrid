import mongoose from "../connect.js";

const file_schema = new mongoose.Schema({
	_belong: String,
	_root: String,
	name: String,
	inTrash: { type: Boolean, default: "false" },
});

const file_model = new mongoose.model("files", file_schema);

export default file_model;
