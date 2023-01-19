import DOM_FACTORY from "./DOM_factory.js";

class CONTEXT_ACTION extends DOM_FACTORY {
	constructor(identify) {
		super();
		this.identify = identify;
		this.previous_dom_selected;
	}
	set_context_for(dom, options = [], consequence = () => {}) {
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
					consequence();
				});
				return btn;
			},
			_clear: () => {
				const btn = this.create({ type: "button", text: "Clear All", css: { ...referenceCSS }, attribute: {} });
				btn.addEventListener("click", (e) => {
					this.clear_inside(dom);
					this.clear_inside(this.identify);
					consequence();
				});
				return btn;
			},
			_parent: () => {
				const wrap = this.create({ type: "div", css: { display: "flex", gap: "5px" } });
				const inpWidth = this.create({ type: "input", css: { padding: "0 5px" }, attribute: { type: "text", placeholder: "Width" } });
				const inpHeight = this.create({ type: "input", css: { padding: "0 5px" }, attribute: { type: "text", placeholder: "Height" } });
				const inpGap = this.create({ type: "input", css: { padding: "0 5px" }, attribute: { type: "text", placeholder: "Gap" } });
				const inpJustify = this.create_option(
					{
						unset: "unset",
						"space between": "space-between",
						"space around": "space-around",
						"space-evenly": "space-evenly",
					},
					{ selected: 0 }
				);
				const pack = [inpWidth, inpHeight, inpGap, inpJustify];
				pack.forEach((ele) => {
					wrap.appendChild(ele);
				});
				inpWidth.addEventListener("change", (e) => {
					dom.parentNode.style.width = `${inpWidth.value}px`;
				});
				inpHeight.addEventListener("change", (e) => {
					dom.parentNode.style.height = `${inpHeight.value}px`;
				});
				inpGap.addEventListener("change", (e) => {
					dom.parentNode.style.gap = `${inpGap.value}px`;
				});
				inpJustify.addEventListener("change", (e) => {
					dom.style.justifyContent = inpJustify.value;
				});
				consequence();
				return wrap;
			},
			_doSomething: () => {
				const btn = this.create({ type: "button", text: "Do something", css: { ...referenceCSS }, attribute: {} });
				btn.addEventListener("click", (e) => {
					console.log("Do something!");
				});
				return btn;
			},
		};
		if (!this.previous_dom_selected) {
			dom.classList.add("selected");
			this.previous_dom_selected = dom;
		} else {
			this.previous_dom_selected.classList.remove("selected");
			dom.classList.add("selected");
			this.previous_dom_selected = dom;
		}
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
