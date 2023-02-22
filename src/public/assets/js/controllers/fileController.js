import CONTROLLER from "./controller.js";
class FILE_CONTROLLER extends CONTROLLER {
	constructor() {
		super();
	}
	async display(callback) {
		const response = await this.get("/file");
		callback(await response.json());
	}
	async create(params, callback) {
		const response = await this.post("/file", params);
		if (response.ok) {
			callback(await response.json());
		}
	}
	async delete(params = {}, callback) {
		const response = await this.post_delete("/file", params);
		if (response.ok) {
			callback(await response.json());
		}
	}
}

export default FILE_CONTROLLER;
