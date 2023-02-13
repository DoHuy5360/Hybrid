import { file_model } from "../database/models/file.js";

const getFileContent = async (req, res) => {
	const id = req.params.id;

	res.send(id);
};
const storeNewFile = async (req, res) => {
	const { _belong, name } = req.body;
	const de = await new file_model({ _belong, name });
	de.save();
	console.log("!!!");
	res.send("???");
};
export { getFileContent, storeNewFile };
