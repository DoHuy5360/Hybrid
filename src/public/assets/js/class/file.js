import CONTENT_TABLE from "./content_table.js";
import DOM_FACTORY from "./dom_factory.js";
import INTERACTIVE from "./interactive.js";

// const origin_sign = '<i class="fa-solid fa-xmark"></i>';
const table_entity = new CONTENT_TABLE();
export const file_name = document.querySelector(".file-name");
const laboratory = document.querySelector(".laboratory");
export let file_selected = {
	node: undefined,
	attrs: undefined,
};
class FILE extends DOM_FACTORY {
	constructor({ name, content }) {
		super();
		this.open = false;
		this.name = name;
		this.content = content;
	}

	create_file(file) {
		const leaf = this.create({ type: "li", attribute: { class: "leaf" } });
		const name = this.create({ type: "div", text: this.name });
		leaf.appendChild(name);
		leaf.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-file"></i>');
		this.identify = leaf;
		this.control((on) => {
			on.click(() => {
				file_name.innerText = this.name;
				file_selected.node = leaf;
				file_selected.attrs = file;
				if (!this.open) {
					const content_table = table_entity.create_content_table(this);
					laboratory.appendChild(content_table);
					content_table.value = this.content;
					this.open = true;
				}
			});
		});
		return leaf;
	}
}
export default FILE;
