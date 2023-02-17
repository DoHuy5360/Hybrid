import folder_model from "../database/models/folderModel.js";
const inspect = async (req, res) => {
	const _id = req.params.root;
	const { name } = await folder_model.findOne({ _id, inTrash: false });
	// const folders_collection = await folder_model.find({ _root, inTrash: false });
	// res.json({ folders_collection });
	res.render("test/components/upload_file", { _root: _id, name });
};
const createRootFolder = async (req, res) => {};
export { inspect, createRootFolder };
