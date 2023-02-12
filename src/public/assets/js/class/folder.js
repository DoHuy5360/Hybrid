import DOM_FACTORY from "./dom_factory.js";

export let tree_selected;

class FOLDER extends DOM_FACTORY {
	constructor() {
		super();
		this.folder_close_icon = this.convert_to_dom('<i class="fa-solid fa-folder"></i>');
		this.folder_open_icon = this.convert_to_dom('<i class="fa-regular fa-folder-open"></i>');
	}
	create_folder(folder) {
		const branch = this.create({ type: "li", attribute: { class: "branch" } });
		const tree = this.create({ type: "div", attribute: { class: "tree" } });
		tree.prepend(this.folder_close_icon);
		const name = this.create({ type: "div", text: folder.name });
		tree.appendChild(name);
		const branch_view = this.create({ type: "ul", attribute: { class: "branch-view", "data-id": folder._id } });
		branch.appendChild(tree);
		branch.appendChild(branch_view);

		tree.addEventListener("click", (e) => {
			branch.querySelector(".branch-view").classList.toggle("visible");
			if (tree.firstChild === this.folder_close_icon) {
				tree.firstChild.remove();
				tree.prepend(this.folder_open_icon);
			} else {
				tree.firstChild.remove();
				tree.prepend(this.folder_close_icon);
			}
			tree.classList.add("selected");
			if (tree_selected !== undefined && tree_selected !== tree) {
				tree_selected.classList.remove("selected");
			}
			tree_selected = tree;
		});

		return branch;
	}
}
export default FOLDER;
