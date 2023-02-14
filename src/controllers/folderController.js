import folder_model from "../database/models/folderModel.js";

const getFolders = async (req, res) => {
	const folders_collection = await folder_model.find();
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

export { getFolders, storeNewFolder };
