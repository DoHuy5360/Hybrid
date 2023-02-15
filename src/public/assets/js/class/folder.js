import DOM_FACTORY from "./dom_factory.js";
import CONTEXTMENU from "./contextmenu.js";
import INTERACTIVE from "./interactive.js";
import FOLDER_CONTROLLER from "../controllers/folderController.js";
export let tree_selected = {
	node: undefined,
	attrs: undefined,
};
let previous_context_menu;
class FOLDER extends DOM_FACTORY {
	constructor() {
		super();
		this.folder_close_icon = this.convert_to_dom('<i class="fa-solid fa-folder"></i>');
		this.folder_open_icon = this.convert_to_dom('<i class="fa-regular fa-folder-open"></i>');
	}
	create_folder(folder) {
		const branch = this.create({ type: "li", attribute: { class: "branch" } });
		const tree = this.create({ type: "div", attribute: { class: "tree" } });
		const name = this.create({ type: "div", text: folder.name });
		const branch_view = this.create({ type: "ul", attribute: { class: "branch-view", "data-id": folder._id } });
		tree.prepend(this.folder_close_icon);
		tree.appendChild(name);
		branch.appendChild(tree);
		branch.appendChild(branch_view);
		this.identify = tree;
		this.control((on) => {
			on.click(() => {
				if (previous_context_menu) {
					previous_context_menu.remove();
				}
				branch.querySelector(".branch-view").classList.toggle("visible");
				if (tree.firstChild === this.folder_close_icon) {
					tree.firstChild.remove();
					tree.prepend(this.folder_open_icon);
				} else {
					tree.firstChild.remove();
					tree.prepend(this.folder_close_icon);
				}
				tree.classList.add("selected");
				if (tree_selected.node !== undefined && tree_selected.node !== tree) {
					tree_selected.node.classList.remove("selected");
				}
				tree_selected.node = tree;
				tree_selected.attrs = folder;
			});
			on.contextmenu((thisFolder, e) => {
				e.preventDefault();
				const { clientX, clientY } = e;
				if (previous_context_menu) {
					previous_context_menu.remove();
				}
				let context_menu = new CONTEXTMENU();
				context_menu.use_default_style();
				const delete_button = this.create({ type: "div", text: "Delete" });
				const delete_entity = new INTERACTIVE(delete_button);
				delete_entity.control((on) => {
					const folder_controller = new FOLDER_CONTROLLER();
					on.click(() => {
						folder_controller.delete({ _id: folder._id }, (res) => {
							if (res.action) {
								branch.remove();
								context_menu.entity.remove();
							}
						});
					});
				});
				context_menu.append_all(delete_button);
				document.body.appendChild(context_menu.entity);

				context_menu.set_position({ x: clientX, y: clientY });
				previous_context_menu = context_menu.entity;
			});
		});

		return branch;
	}
}
export default FOLDER;
