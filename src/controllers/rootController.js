import folder_model from "../database/models/folderModel.js";
const inspect = async (req, res) => {
	const _root = req.params.root;
	const folders_collection = await folder_model.find({ _root, inTrash: false });
	// res.json({ folders_collection });
	res.render("test/components/upload_file", { _root });
};
export { inspect };
