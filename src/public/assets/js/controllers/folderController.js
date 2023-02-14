import CONTROLLER from "./controller.js";
class FOLDER_CONTROLLER extends CONTROLLER {
	constructor() {
		super();
	}
	async create(params, callback) {
		const response = await this.post("/folder", params);
		if (response.ok) {
			callback(await response.json());
		}
	}
}

export default FOLDER_CONTROLLER;
