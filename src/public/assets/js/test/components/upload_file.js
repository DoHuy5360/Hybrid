import FOLDER, { tree_selected } from "../../class/folder.js";
import FILE from "../../class/file.js";
import DOM_FACTORY from "../../class/dom_factory.js";
import FOLDER_CONTROLLER from "../../controllers/folderController.js";
import FILE_CONTROLLER from "../../controllers/fileController.js";
import INTERACTIVE from "../../class/interactive.js";

const file_controller = new FILE_CONTROLLER();
const folder_controller = new FOLDER_CONTROLLER();

const laboratory = document.querySelector(".laboratory");
const root = document.querySelector("#root");
const data_id = root.getAttribute("data-id");
folder_controller.display(`?isRoot=false&_root=${data_id}`, (res) => {
	res.folders_collection.forEach((folder) => {
		const folder_obj = new FOLDER();
		const folder_entity = folder_obj.create_folder(folder);
		const tree_body = document.querySelector(`[data-id="${folder._belong}"]`);
		if (tree_body) {
			tree_body.appendChild(folder_entity);
		} else {
			console.warn("_belong attribute not found:", folder._belong, "| Folder name:", folder.name);
		}
	});
});
file_controller.display((res) => {
	res.files_collection.forEach((file) => {
		const file_obj = new FILE(file);
		const file_entity = file_obj.create_file(file);
		const tree_body = document.querySelector(`[data-id="${file._belong}"]`);
		if (tree_body) {
			tree_body.appendChild(file_entity);
		} else {
			console.warn("_belong attribute not found:", file._belong, "| File name:", file.name);
		}
	});
});
function setIconState() {
	tree_selected.node.firstChild.remove();
	tree_selected.node.prepend(dom_obj.convert_to_dom('<i class="fa-regular fa-folder-open"></i>'));
}
let bud_queue;
function budding_crafting({ setEnterEvent, icon, thisIsFolder }) {
	// display branch view
	const parent_tree = tree_selected.node.parentNode;
	const container = parent_tree.querySelector(".branch-view");
	container.classList.add("visible");
	// create new obj input
	const dom_factory = new DOM_FACTORY();
	const wrap_input = dom_factory.create({ type: "li", attribute: { class: "branch" } });
	const shoot_wrapper = dom_factory.create({ type: "div", attribute: { class: "shoot-wrapper" } });
	const input = dom_factory.create({ type: "input", attribute: { class: "shoot" } });
	setEnterEvent(input);
	destroyWhenBlur(input);
	shoot_wrapper.insertAdjacentHTML("afterbegin", icon);
	shoot_wrapper.appendChild(input);
	wrap_input.appendChild(shoot_wrapper);
	if (bud_queue) {
		bud_queue.remove();
	}
	bud_queue = wrap_input;
	if (thisIsFolder) {
		container.prepend(bud_queue);
	} else {
		container.appendChild(bud_queue);
	}
	input.focus();
}
let allow_to_add = true;
const add_file = document.querySelector(".add-file");
add_file.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	if (tree_selected.node && allow_to_add) {
		setIconState();
		budding_crafting({ setEnterEvent: enterFileEvent, icon: '<i class="fa-solid fa-file"></i>' });
	} else {
		allow_to_add = false;
		tree_selected.attrs = { _id: data_id };
		const dom_factory = new DOM_FACTORY();
		const wrap_input = dom_factory.create({ type: "li", attribute: { class: "branch" } });
		const shoot_wrapper = dom_factory.create({ type: "div", attribute: { class: "shoot-wrapper" } });
		const input = dom_factory.create({ type: "input", attribute: { class: "shoot" } });
		enterFolderEvent(input);
		destroyWhenBlur(input);
		shoot_wrapper.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-file"></i>');
		shoot_wrapper.appendChild(input);
		wrap_input.appendChild(shoot_wrapper);
		root.appendChild(wrap_input);
		input.focus();
	}
});
const dom_obj = new DOM_FACTORY();
const add_folder = document.querySelector(".add-folder");
add_folder.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	if (tree_selected.node && allow_to_add) {
		setIconState();
		budding_crafting({ setEnterEvent: enterFolderEvent, icon: '<i class="fa-solid fa-folder"></i>', thisIsFolder: true });
	} else {
		allow_to_add = false;
		tree_selected.attrs = { _id: data_id };
		const dom_factory = new DOM_FACTORY();
		const wrap_input = dom_factory.create({ type: "li", attribute: { class: "branch" } });
		const shoot_wrapper = dom_factory.create({ type: "div", attribute: { class: "shoot-wrapper" } });
		const input = dom_factory.create({ type: "input", attribute: { class: "shoot" } });
		enterFolderEvent(input);
		destroyWhenBlur(input);
		shoot_wrapper.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-folder"></i>');
		shoot_wrapper.appendChild(input);
		wrap_input.appendChild(shoot_wrapper);
		root.appendChild(wrap_input);
		input.focus();
	}
});
let isBlur = true;
function destroyWhenBlur(dom) {
	dom.addEventListener("blur", (e) => {
		allow_to_add = true;
		try {
			if (isBlur) {
				dom.parentNode.remove();
			} else {
				isBlur = true;
			}
		} catch (err) {
			// console.log(err);
		}
	});
}
function enterFileEvent(input) {
	input.addEventListener("keypress", (e) => {
		if (e.key === "Enter" && input.value) {
			console.log(tree_selected);
			const file_data = { _belong: tree_selected.attrs._id, _root: data_id, name: input.value };
			file_controller.create(file_data, (res) => {
				if (res.action) {
					isBlur = false;
					bud_queue = null;
					allow_to_add = true;
					const file_obj = new FILE({ name: input.value });
					const file_entity = file_obj.create_file(file_data);
					input.parentNode.parentNode.appendChild(file_entity);
					try {
						input.parentNode.remove();
					} catch (err) {
						console.warn(err);
					}
				}
			});
		}
	});
}
function enterFolderEvent(input) {
	input.addEventListener("keypress", async (e) => {
		if (e.key === "Enter" && input.value) {
			const folder_data = { _belong: tree_selected.attrs._id, _root: data_id, name: input.value };
			folder_controller.create(folder_data, (res) => {
				if (res.action) {
					folder_data._id = res._id;
					isBlur = false;
					bud_queue = null;
					allow_to_add = true;
					const folder_obj = new FOLDER();
					const folder_entity = folder_obj.create_folder(folder_data);
					input.parentNode.parentNode.appendChild(folder_entity);
					try {
						input.parentNode.remove();
					} catch (err) {
						console.warn(err);
					}
				}
			});
		}
	});
}
const window_entity = new INTERACTIVE(document.body);
window_entity.control((on) => {
	on.click((thisWindow, e) => {
		if (tree_selected.node) {
			tree_selected.node.classList.remove("selected");
			tree_selected.node = undefined;
		}
		tree_selected.attrs = undefined;
	});
});
