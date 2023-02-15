import file_model from "../database/models/fileModel.js";

const getFiles = async (req, res) => {
	const files_collection = await file_model.find();
	res.json({
		files_collection,
	});
};
const storeNewFile = async (req, res) => {
	const { _belong, name } = req.body;
	await file_model.create({ _belong, name }, (err, doc) => {
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
export { getFiles, storeNewFile, putFileToTrash };
