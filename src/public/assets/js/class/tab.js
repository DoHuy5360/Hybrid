import DOM_FACTORY from "./dom_factory.js";
import LOGIC from "./logic.js";
import { file_selected } from "./file.js";
const tab_logic = new LOGIC();
const table_logic = new LOGIC();
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
			tab_logic.replace_handle({ domObject: file_tab, className: "selected" });
			table_logic.replace_handle({ domObject: content_table, className: "selected" });
			file_selected.node = file_reference.identify;
			file_selected.attrs = file_reference.attribute;
		});
		file_tab.appendChild(file_name);
		file_tab.appendChild(this.close_sign);
		return file_tab;
	}
}
export default TAB;
