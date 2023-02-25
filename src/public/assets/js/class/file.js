import FILE_CONTROLLER from "../controllers/fileController.js";
import CONTENT_TABLE from "./content_table.js";
import CONTEXTMENU from "./contextmenu.js";
import DOM_FACTORY from "./dom_factory.js";
import { previous_context_menu } from "./folder.js";
import INTERACTIVE from "./interactive.js";
import TAB, { table_logic, tab_selected } from "./tab.js";
import { tab_logic } from "./tab.js";
// const origin_sign = '<i class="fa-solid fa-xmark"></i>';

export const file_name = document.querySelector(".file-name");
export const laboratory = document.querySelector(".laboratory");
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
		this.id = file._id;
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
			on.contextmenu((thisFile, e) => {
				e.preventDefault();
				const { clientX, clientY } = e;
				if (previous_context_menu.node) {
					previous_context_menu.node.remove();
					previous_context_menu.file.classList.remove("context");
				}
				let context_menu = new CONTEXTMENU();
				context_menu.use_default_style();
				const delete_button = this.create({ type: "div", text: "Delete" });
				const delete_entity = new INTERACTIVE(delete_button);
				delete_entity.control((on) => {
					const file_controller = new FILE_CONTROLLER();
					on.click(() => {
						file_controller.delete({ _id: this.id }, (res) => {
							if (res.action) {
								leaf.remove();
								context_menu.entity.remove();
							}
						});
					});
				});
				context_menu.append_all(delete_button);
				document.body.appendChild(context_menu.entity);

				context_menu.set_position({ x: clientX, y: clientY });
				previous_context_menu.node = context_menu.entity;
				previous_context_menu.file = leaf;
				leaf.classList.add("context");
			});
		});
		return leaf;
	}
}
export default FILE;
