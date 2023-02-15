import CONTROLLER from "./controller.js";
class FOLDER_CONTROLLER extends CONTROLLER {
	constructor() {
		super();
	}
	async display(callback) {
		const response = await this.get("/folder");
		callback(await response.json());
	}
	async create(params, callback) {
		const response = await this.post("/folder", params);
		if (response.ok) {
			callback(await response.json());
		}
	}
	async delete(params = {}, callback) {
		const response = await this.post_delete("/folder", params);
		if (response.ok) {
			callback(await response.json());
		}
	}
}

export default FOLDER_CONTROLLER;
