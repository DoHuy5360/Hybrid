import file_model from "../database/models/fileModel.js";

const getFiles = async (req, res) => {
	const files_collection = await file_model.find({ inTrash: false });
	res.json({
		files_collection,
	});
};
const storeNewFile = async (req, res) => {
	const { _belong, _root, name } = req.body;
	await file_model.create({ _belong, _root, name }, (err, doc) => {
		if (err) {
			console.log(err);
			res.json({
				action: false,
			});
		} else {
			res.json({
				action: true,
			});
		}
	});
};
const storeFileContent = async (req, res) => {
	const { _id, content } = req.body;
	try {
		await file_model.updateOne({ _id }, { content });
		res.json({ action: true });
	} catch (err) {
		console.log(err);
		res.json({ action: false });
	}
};
const putFileToTrash = async (req, res) => {
	const { _id } = req.body;
	try {
		await file_model.updateOne({ _id }, { inTrash: true });
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
export { getFiles, storeNewFile, storeFileContent, putFileToTrash };
