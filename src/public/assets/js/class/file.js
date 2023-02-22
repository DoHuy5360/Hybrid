import CONTENT_TABLE from "./content_table.js";
import DOM_FACTORY from "./dom_factory.js";
import INTERACTIVE from "./interactive.js";
import TAB, { table_logic, tab_selected } from "./tab.js";
import { tab_logic } from "./tab.js";
// const origin_sign = '<i class="fa-solid fa-xmark"></i>';

export const file_name = document.querySelector(".file-name");
const laboratory = document.querySelector(".laboratory");
export let file_selected = {
	previous: undefined,
	node: undefined,
	attrs: undefined,
};
class FILE extends DOM_FACTORY {
	constructor(file) {
		super();
		this.open = false;
		this.attribute = file;
		this.name = file.name;
		this.content = file.content || "";
	}

	create_file() {
		const leaf = this.create({ type: "li", attribute: { class: "leaf" } });
		const name = this.create({ type: "div", text: this.name });
		leaf.appendChild(name);
		leaf.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-file"></i>');
		this.identify = leaf;
		let tab, content_table;
		this.control((on) => {
			on.click(() => {
				const tab_entity = new TAB();
				const table_entity = new CONTENT_TABLE();
				file_selected.node = leaf;
				file_selected.attrs = this.attribute;
				if (!this.open) {
					content_table = table_entity.create_content_table(this);
					tab = tab_entity.create_tab(this, content_table);
					file_name.appendChild(tab);
					laboratory.appendChild(content_table);
					content_table.value = this.content;
					this.open = true;
				}
				tab_logic.replace_handle({ domObject: tab, className: "selected" });
				table_logic.replace_handle({ domObject: content_table, className: "selected" });
				tab_selected.node = tab;
			});
		});
		return leaf;
	}
}
export default FILE;
