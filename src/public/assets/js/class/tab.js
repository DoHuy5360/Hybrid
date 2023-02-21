import DOM_FACTORY from "./dom_factory.js";

class TAB extends DOM_FACTORY {
	constructor() {
		super();
		this.close_sign = this.convert_to_dom('<i class="fa-solid fa-xmark"></i>');
	}
	create_tab(file_reference, content_table) {
		const file_tab = this.create({ type: "div", attribute: { class: "tab" } });
		const file_name = this.create({ type: "div", text: file_reference.name });
		this.close_sign.addEventListener("click", (e) => {
			content_table.remove();
			file_tab.remove();
			file_reference.open = false;
		});
		file_tab.addEventListener("click", (e) => {
			tabSelected(content_table);
		});
		file_tab.appendChild(file_name);
		file_tab.appendChild(this.close_sign);
		return file_tab;
	}
}
let previous_tab;
function tabSelected(dom) {
	if (!previous_tab) {
		dom.classList.add("selected");
	} else {
		previous_tab.classList.remove("selected");
		dom.classList.add("selected");
	}
	previous_tab = dom;
}
export default TAB;
