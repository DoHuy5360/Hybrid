import DOM_FACTORY from "./dom_factory.js";
import LOGIC from "./logic.js";
import { file_selected } from "./file.js";
export const tab_logic = new LOGIC();
export const table_logic = new LOGIC();
export let tab_selected = {
	node: undefined,
};
class TAB extends DOM_FACTORY {
	constructor() {
		super();
		this.close_sign = this.convert_to_dom('<div class="close-tab"><i class="fa-solid fa-xmark"></i></div>');
	}
	create_tab(file_reference, content_table) {
		const file_tab = this.create({ type: "div", attribute: { class: "tab selected" } });
		const file_name = this.create({ type: "div", text: file_reference.name });
		this.close_sign.addEventListener("click", (e) => {
			e.stopImmediatePropagation();
			if (tab_selected.node === file_tab) {
				const beside_tab = tab_logic.previous.previousSibling || tab_logic.previous.nextSibling;
				const beside_table = table_logic.previous.previousSibling || tab_logic.previous.nextSibling;
				if (beside_tab && beside_table) {
					tab_logic.replace_handle({ domObject: beside_tab, className: "selected" });
					table_logic.replace_handle({ domObject: beside_table, className: "selected" });
					tab_selected.node = beside_tab;
				}
			}
			content_table.remove();
			file_tab.remove();
			file_reference.open = false;
		});
		file_tab.addEventListener("click", (e) => {
			if (tab_selected.node !== file_tab) {
				tab_logic.replace_handle({ domObject: file_tab, className: "selected" });
				table_logic.replace_handle({ domObject: content_table, className: "selected" });
				file_selected.node = file_reference.identify;
				file_selected.attrs = file_reference.attribute;
				tab_selected.node = file_tab;
			}
		});
		file_tab.appendChild(file_name);
		file_tab.appendChild(this.close_sign);
		return file_tab;
	}
}
export default TAB;
