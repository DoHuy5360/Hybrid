import { contextHead, contextLeft, setTemporary } from "../test/reference.js";
import INTERACTIVE from "./interactive.js";

class DOM_FACTORY extends INTERACTIVE {
	constructor() {
		super();
	}
	create({ type = "div", text = "", css = {}, attribute = {} }) {
		const dom = document.createElement(type);
		dom.textContent = text;
		Object.assign(dom.style, css);
		if (Object.keys(attribute).length !== 0) {
			for (const attr in attribute) {
				if (Object.hasOwnProperty.call(attribute, attr)) {
					const attrValue = attribute[attr];
					dom.setAttribute(attr, attrValue);
				}
			}
		}
		return dom;
	}
	convert_to_dom(html) {
		const wrap = document.createElement("div");
		wrap.insertAdjacentHTML("beforeend", html);
		return wrap.firstChild;
	}
	create_option(options = {}, { selected = 0 }) {
		const select = this.create({ type: "select", css: {} });
		Object.keys(options).forEach((opt, idx) => {
			const value = options[opt];
			const defaultSelect = selected == idx ? { selected: "selected" } : {};
			const option = this.create({ type: "option", text: opt, attribute: { value: value, ...defaultSelect } });
			select.appendChild(option);
		});
		return select;
	}
	create_data_list(id, values = []) {
		const dataList = this.create({ type: "datalist", attribute: { id } });
		values.forEach((value) => {
			const option = this.create({ type: "option", attribute: { value: value } });
			dataList.appendChild(option);
		});
		return dataList;
	}
	create_button() {
		this.identify = this.create({
			type: "button",
			text: "Button",
			css: {
				width: "fit-content",
				background: "#eaeaea",
				"word-break": "break-word",
				padding: "5px 10px",
				cursor: "grab",
				"font-size": "14px",
			},
			attribute: { type: "button" },
		});
		this.can_move(true);
		this.control((on) => {
			on.dragstart((thisBtn, e) => {
				setTemporary(thisBtn);
			});
			on.contextmenu((thisBtn) => {
				contextLeft.set_context_for(thisBtn, ["_config"]);
				contextHead.set_context_for(thisBtn, ["_delete"]);
			});
		});
		return this.identify;
	}
	create_input() {
		this.identify = this.create({
			type: "input",
			css: {
				outline: "unset",
				border: "1px solid #eaeaea",
				padding: "2px 4px",
				width: "fit-content",
				height: "fit-content",
			},
			attribute: {
				spellcheck: "false",
			},
		});
		this.can_move(true);
		this.control((on) => {
			on.dragstart((thisInp) => {
				setTemporary(thisInp);
			});
			on.contextmenu((thisInp) => {
				contextLeft.set_context_for(thisInp, ["_config"]);
				contextHead.set_context_for(thisInp, ["_delete"]);
			});
		});
		return this.identify;
	}
	create_textarea() {
		this.identify = this.create({
			type: "textarea",
			css: {
				outline: "unset",
				border: "1px solid #eaeaea",
				padding: "2px 4px",
				width: "fit-content",
				height: "fit-content",
			},
			attribute: {
				spellcheck: "false",
			},
		});
		this.can_move(true);
		this.control((on) => {
			on.dragstart((thisArea) => {
				setTemporary(thisArea);
			});
			on.contextmenu((thisArea) => {
				contextLeft.set_context_for(thisArea, ["_config"]);
				contextHead.set_context_for(thisArea, ["_delete"]);
			});
		});
		return this.identify;
	}
	create_image() {
		this.identify = this.create({
			type: "img",
			css: {
				// outline: "unset",
				// border: "1px solid #eaeaea",
				// padding: "2px 4px",
				width: "100px",
				height: "100px",
			},
			attribute: {
				src: "/image_placeholder.png",
			},
		});
		this.can_move(true);
		this.control((on) => {
			on.dragstart((thisInp) => {
				setTemporary(thisInp);
			});
			on.contextmenu((thisInp) => {
				contextLeft.set_context_for(thisInp, ["_config"]);
				contextHead.set_context_for(thisInp, ["_delete"]);
			});
		});
		return this.identify;
	}
}
export default DOM_FACTORY;
