import DOM_FACTORY from "./dom_factory.js";

class CONTEXTMENU extends DOM_FACTORY {
	constructor() {
		super();
		this.entity = this.create({ type: "div" });
	}
	use_default_style() {
		this.entity.setAttribute("class", "tree-context");
		this.identify = this.entity;
		this.control((on) => {
			on.contextmenu((thisContext, e) => {
				e.preventDefault();
			});
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
