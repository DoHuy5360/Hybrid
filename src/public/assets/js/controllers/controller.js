class CONTROLLER {
	constructor() {}
	async get() {}
	async post(endpoint, params) {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(params),
		})
			.then((res) => res)
			.catch((err) => {
				console.warn(err);
				return { status: false };
			});
		return response;
	}
}

export default CONTROLLER;
