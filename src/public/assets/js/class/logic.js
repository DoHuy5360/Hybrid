class LOGIC {
	constructor() {
		this.previous;
	}
	replace_handle({ domObject, className }) {
		if (!this.previous) {
			domObject.classList.add(className);
		} else {
			this.previous.classList.remove(className);
			domObject.classList.add(className);
		}
		this.previous = domObject;
	}
}

export default LOGIC;
