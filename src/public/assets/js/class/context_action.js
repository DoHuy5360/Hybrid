import DOM_FACTORY from "./DOM_factory.js";

class CONTEXT_ACTION extends DOM_FACTORY {
	constructor(identify) {
		super();
		this.identify = identify;
	}
	set_context_for(dom, options = []) {
		this.clear_inside(this.identify);
		const referenceCSS = {
			cursor: "pointer",
		};
		const actions = {
			_delete: () => {
				const btn = this.create({ type: "button", text: "Delete", css: { ...referenceCSS }, attribute: {} });
				btn.addEventListener("click", (e) => {
					this.delete(dom);
					this.clear_inside(this.identify);
				});
				return btn;
			},
			_doSomething: () => {
				const btn = this.create({ type: "button", text: "Do something", css: { ...referenceCSS }, attribute: {} });
				btn.addEventListener("click", (e) => {
					console.log("Do something!");
				});
				return btn;
			},
		};
		options.forEach((opt) => {
			this.identify.appendChild(actions[opt]());
		});
	}
	delete(dom) {
		dom.remove();
	}
	clear_inside(dom) {
		dom.innerHTML = "";
	}
}

export default CONTEXT_ACTION;
