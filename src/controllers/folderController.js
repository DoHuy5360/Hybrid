import file_model from "../database/models/fileModel.js";
import folder_model from "../database/models/folderModel.js";

const getFolders = async (req, res) => {
	const isRoot = req.query.root;
	console.log(isRoot);
	const folders_collection = await folder_model.find({ isRoot, inTrash: false });
	res.json({
		folders_collection,
	});
};
const storeNewFolder = async (req, res) => {
	const { _belong, name } = req.body;
	await folder_model.create({ _belong, name }, (err, doc) => {
		if (err) {
			res.json({ action: false });
			console.log(err);
		} else {
			const { _id } = doc;
			res.json({ action: true, _id });
		}
	});
};
const putFolderToTrash = async (req, res) => {
	const { _id } = req.body;
	try {
		await folder_model.updateOne({ _id }, { inTrash: true });
		await folder_model.updateMany({ _belong: _id }, { inTrash: true });
		await file_model.updateMany({ _belong: _id }, { inTrash: true });
		res.json({
			action: true,
		});
	} catch (error) {
		res.json({
			action: false,
		});
		console.log(error);
	}
};
export { getFolders, storeNewFolder, putFolderToTrash };
