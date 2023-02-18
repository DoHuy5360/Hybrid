import DOM_FACTORY from "./dom_factory.js";
const content = document.querySelector(".content");
class FILE extends DOM_FACTORY {
	constructor() {
		super();
		this.open = false;
	}

	create_file(file) {
		const leaf = this.create({ type: "li", attribute: { class: "leaf" } });
		const name = this.create({ type: "div", text: file.name });
		leaf.appendChild(name);
		leaf.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-file"></i>');
		this.identify = leaf;
		this.control((on) => {
			on.click(() => {
				if (!this.open) {
					content.value = file.content;
					this.open = true;
				}
			});
		});
		return leaf;
	}
}
export default FILE;
