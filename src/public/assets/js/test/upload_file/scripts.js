import FOLDER, { tree_selected } from "../../class/folder.js";
import FILE from "../../class/file.js";
import DOM_FACTORY from "../../class/dom_factory.js";
const list_folder = [
	{ _id: 0, _belong: -1, name: "Hybrid" },
	{ _id: 1, _belong: 0, name: "node_modules" },
	{ _id: 2, _belong: 0, name: "src" },
	{ _id: 3, _belong: 2, name: "views" },
	{ _id: 4, _belong: 2, name: "public" },
	{ _id: 5, _belong: 2, name: "test" },
	{ _id: 7, _belong: 4, name: "assets" },
	{ _id: 6, _belong: 7, name: "js" },
];
const list_file = [
	{ _id: 0, _belong: 0, name: ".gitignore" },
	{ _id: 1, _belong: 0, name: ".env" },
	{ _id: 2, _belong: 0, name: "index.js" },
	{ _id: 3, _belong: 0, name: "packet.json" },
	{ _id: 4, _belong: 3, name: "home.pug" },
	{ _id: 5, _belong: 3, name: "404.pug" },
	{ _id: 6, _belong: 4, name: "img.png" },
	{ _id: 7, _belong: 0, name: "README.md" },
];

// const root = document.querySelector(".root");
list_folder.forEach((folder) => {
	const folder_obj = new FOLDER();
	const folder_entity = folder_obj.create_folder(folder);
	const tree_body = document.querySelector(`[data-id="${folder._belong}"]`);
	tree_body.appendChild(folder_entity);
});
list_file.forEach((file) => {
	const file_obj = new FILE();
	const file_entity = file_obj.create_file(file);
	const tree_body = document.querySelector(`[data-id="${file._belong}"]`);
	tree_body.appendChild(file_entity);
});
function setIconState() {
	tree_selected.firstChild.remove();
	tree_selected.prepend(dom_obj.convert_to_dom('<i class="fa-regular fa-folder-open"></i>'));
}
let allow_to_add = true;
const add_file = document.querySelector(".add-file");
add_file.addEventListener("click", (e) => {
	if (tree_selected && allow_to_add) {
		allow_to_add = false;
		setIconState();
		const parent_tree = tree_selected.parentNode;
		const container = parent_tree.querySelector(".branch-view");
		container.classList.add("visible");
		const li = document.createElement("li");
		const input = document.createElement("input");
		addNewWhenEnter(input);
		destroyWhenBlur(input);
		li.setAttribute("class", "branch");
		li.appendChild(input);
		container.prepend(li);
		input.focus();
	}
});
const dom_obj = new DOM_FACTORY();
const add_folder = document.querySelector(".add-folder");
add_folder.addEventListener("click", (e) => {
	if (tree_selected && allow_to_add) {
		setIconState();

		allow_to_add = false;
		const parent_tree = tree_selected.parentNode;
		const container = parent_tree.querySelector(".branch-view");
		container.classList.add("visible");
		const li = document.createElement("li");
		const input = document.createElement("input");
		addNewWhenEnterFolder(input);
		destroyWhenBlur(input);
		li.setAttribute("class", "branch");
		li.appendChild(input);
		container.prepend(li);
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

function addNewWhenEnter(dom) {
	dom.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			isBlur = false;
			const file_data = { _id: 999, _belong: 999, name: dom.value };
			const file_obj = new FILE();
			const file_entity = file_obj.create_file(file_data);
			dom.parentNode.appendChild(file_entity);
			try {
				dom.remove();
			} catch (err) {
				// console.log(err);
			}
		}
	});
}
function addNewWhenEnterFolder(dom) {
	dom.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			isBlur = false;
			const folder_data = { _id: 999, _belong: 999, name: dom.value };
			const folder_obj = new FOLDER();
			const folder_entity = folder_obj.create_folder(folder_data);

			dom.parentNode.appendChild(folder_entity);
			try {
				dom.remove();
			} catch (err) {
				// console.log(err);
			}
		}
	});
}
