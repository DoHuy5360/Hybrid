import mongoose from "../connect.js";

const folder_schema = mongoose.Schema({
	_belong: String,
	name: String,
	inTrash: { type: Boolean, default: false },
});

const folder_model = new mongoose.model("folders", folder_schema);

export default folder_model;
