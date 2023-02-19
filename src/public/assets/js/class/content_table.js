import DOM_FACTORY from "./dom_factory.js";
import { file_name } from "./file.js";
import { file_selected } from "./file.js";
class CONTENT_TABLE extends DOM_FACTORY {
	constructor() {
		super();
		this.change_sign = '<i class="fa-solid fa-circle-notch"></i>';
		this.file_name_changed = false;
	}
	create_content_table() {
		const table_entity = this.create({ type: "textarea", attribute: { class: "content", spellcheck: false } });
		this.identify = table_entity;
		this.control((on) => {
			on.keydown(async (thisTable, e) => {
				if (e.ctrlKey && e.keyCode === 83) {
					e.preventDefault();
					const response = await fetch("/file/content", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							_id: file_selected.attrs._id,
							content: table_entity.value,
						}),
					}).then((res) => res.json());
					if (response.action) {
						file_name.lastChild.remove();
						this.file_name_changed = false;
					} else {
						console.log(response);
					}
				}
			});
			on.input(() => {
				if (!this.file_name_changed) {
					file_name.insertAdjacentHTML("beforeend", this.change_sign);
					this.file_name_changed = true;
				}
			});
		});
		return table_entity;
	}
}

export default CONTENT_TABLE;
