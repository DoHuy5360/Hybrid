class TRAY {
	constructor(identify) {
		this.identify = identify;
	}
	config(control) {
		const actions = {
			dragover: (action) => {
				this.identify.addEventListener("dragover", (e) => {
					e.preventDefault();
					action(this.identify, e);
				});
			},
			dragleave: (action) => {
				this.identify.addEventListener("dragleave", (e) => {
					e.preventDefault();
					action(this.identify, e);
				});
			},
			drop: (action) => {
				this.identify.addEventListener("drop", (e) => {
					action(this.identify, e);
				});
			},
		};
		control(actions);
		return this;
	}
	addStyle(style) {
		this.identify.classList.add(style);
	}
	removeStyle(style) {
		this.identify.classList.remove(style);
	}
}
export default TRAY;
