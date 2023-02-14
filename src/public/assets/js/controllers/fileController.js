import CONTROLLER from "./controller.js";
class FILE_CONTROLLER extends CONTROLLER {
	constructor() {
		super();
	}
	async create(params, callback) {
		const response = await this.post("/file", params);
		if (response.ok) {
			callback(await response.json());
		}
	}
}

export default FILE_CONTROLLER;
