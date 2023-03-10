import mongoose from "../connect.js";

const folder_schema = mongoose.Schema({
	_belong: String,
	_root: String,
	name: String,
	isRoot: { type: Boolean, default: false },
	inTrash: { type: Boolean, default: false },
});

const folder_model = new mongoose.model("folders", folder_schema);

export default folder_model;
