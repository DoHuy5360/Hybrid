import DOM_FACTORY from "./dom_factory.js";

class CONTEXTMENU extends DOM_FACTORY {
	constructor() {
		super();
		this.entity = this.create({ type: "div" });
	}
	use_default_style() {
		Object.assign(this.entity.style, {
			position: "fixed",
			background: "#343746",
			color: "#f5f5f5",
			transform: "translateX(-100%)",
			width: "300px",
			padding: "3px",
			"border-radius": "3px",
			"font-size": ".8rem",
			"user-select": "none",
		});
	}
	set_style(css) {
		Object.assign(this.entity.style, css);
	}
	set_position({ x, y }) {
		Object.assign(this.entity.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	}
	append_all() {
		for (const child of arguments) {
			this.entity.prepend(child);
		}
	}
}
export default CONTEXTMENU;
