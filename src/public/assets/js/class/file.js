import DOM_FACTORY from "./dom_factory.js";
const content = document.querySelector(".content");
content.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.keyCode === 83) {
		e.preventDefault();
		console.log("Save");
		fetch("/file/content", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_id: file_selected.attrs._id,
				content: content.value,
			}),
		});
	}
});
let file_selected = {
	node: undefined,
	attrs: undefined,
};
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
				file_selected.node = leaf;
				file_selected.attrs = file;
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
