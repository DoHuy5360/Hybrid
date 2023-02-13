import DOM_FACTORY from "./dom_factory.js";

class FILE extends DOM_FACTORY {
	constructor() {
		super();
	}

	create_file(file) {
		const leaf = this.create({ type: "li", attribute: { class: "leaf" } });
		const name = this.create({ type: "div", text: file.name });
		leaf.appendChild(name);
		leaf.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-file"></i>');
		return leaf;
	}
}
export default FILE;
