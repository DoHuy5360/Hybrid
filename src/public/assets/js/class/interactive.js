class INTERACTIVE {
	constructor(_identify) {
		this.identify = _identify;
	}
	can_move(can) {
		this.identify.draggable = can;
	}
	control(implement) {
		const actions = {
			dragstart: (action) => {
				this.identify.addEventListener("dragstart", (e) => {
					e.stopImmediatePropagation();
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
			dragover: (action) => {
				this.identify.addEventListener("dragover", (e) => {
					e.preventDefault();
					e.stopImmediatePropagation();
					action(this.identify, e);
				});
			},
			dragleave: (action) => {
				this.identify.addEventListener("dragleave", (e) => {
					e.preventDefault();
					e.stopImmediatePropagation();
					action(this.identify, e);
				});
			},
			drop: (action) => {
				this.identify.addEventListener("drop", (e) => {
					e.stopImmediatePropagation();
					action(this.identify, e);
				});
			},
		};
		implement(actions);
		return this;
	}
	// drag_only() {
	// 	this.identify.addEventListener("dragstart", (e) => {
	// 		e.stopImmediatePropagation();
	// 	});
	// 	this.identify.addEventListener("drag", (e) => {});
	// 	this.identify.addEventListener("dragend", (e) => {});
	// }
	add_class(style) {
		this.identify.classList.add(style);
	}
	remove_class(style) {
		this.identify.classList.remove(style);
	}
	zip() {
		return this.identify;
	}
}
export default INTERACTIVE;
