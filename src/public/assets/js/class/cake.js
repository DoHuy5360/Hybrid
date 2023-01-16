class CAKE {
	constructor(identify) {
		this.identify = identify;
	}
	config(control) {
		const actions = {
			dragstart: (action) => {
				this.identify.addEventListener("dragstart", (e) => {
					action(this.identify, e);
				});
			},
			drag: (action) => {
				this.identify.addEventListener("drag", (e) => {
					action(this.identify, e);
				});
			},
			dragend: (action) => {
				this.identify.addEventListener("dragend", (e) => {
					action(this.identify, e);
				});
			},
		};
		return control(actions);
	}
	addStyle(style) {
		this.identify.classList.add(style);
	}
	removeStyle(style) {
		this.identify.classList.remove(style);
	}
}

export default CAKE;
