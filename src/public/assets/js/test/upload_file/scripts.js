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
	file_entity.addEventListener("click", (e) => {
		inspectLeaf(file._id);
	});
	const tree_body = document.querySelector(`[data-id="${file._belong}"]`);
	tree_body.appendChild(file_entity);
});
const laboratory = document.querySelector(".laboratory");
async function inspectLeaf(file) {
	const echo = await fetch(`http://localhost:4000/inspect/${file}`).then((res) => res.text());
	laboratory.innerHTML = echo;
}
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
	const li = document.createElement("li");
	li.setAttribute("class", "branch");
	const shoot_wrapper = document.createElement("div");
	shoot_wrapper.setAttribute("class", "shoot-wrapper");
	shoot_wrapper.insertAdjacentHTML("afterbegin", icon);
	const input = document.createElement("input");
	input.setAttribute("class", "shoot");
	setEnterEvent(input);
	destroyWhenBlur(input);
	shoot_wrapper.appendChild(input);
	li.appendChild(shoot_wrapper);
	if (bud_queue) {
		bud_queue.remove();
		bud_queue = li;
	} else {
		bud_queue = li;
	}
	if (thisIsFolder) {
		container.prepend(bud_queue);
	} else {
		container.appendChild(bud_queue);
	}
	input.focus();
	// return li;
}
let allow_to_add = true;
const add_file = document.querySelector(".add-file");
add_file.addEventListener("click", (e) => {
	if (tree_selected.node && allow_to_add) {
		setIconState();
		budding_crafting({ setEnterEvent: enterFileEvent, icon: '<i class="fa-solid fa-file"></i>' });
	}
});
const dom_obj = new DOM_FACTORY();
const add_folder = document.querySelector(".add-folder");
add_folder.addEventListener("click", (e) => {
	if (tree_selected.node && allow_to_add) {
		setIconState();
		budding_crafting({ setEnterEvent: enterFolderEvent, icon: '<i class="fa-solid fa-folder"></i>', thisIsFolder: true });
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
async function storeNewFile(file_data) {
	await fetch(`http://localhost:4000/file`, {
		method: "POST",
		body: JSON.stringify(file_data),
		headers: {
			"Content-Type": "application/json",
		},
	});
}
function enterFileEvent(dom) {
	dom.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			isBlur = false;
			allow_to_add = true;
			const file_data = { _id: 999, _belong: tree_selected.attrs._id, name: dom.value };
			const file_obj = new FILE();
			const file_entity = file_obj.create_file(file_data);
			dom.parentNode.parentNode.appendChild(file_entity);
			storeNewFile(file_data);
			try {
				dom.parentNode.remove();
			} catch (err) {
				// console.log(err);
			}
		}
	});
}
function enterFolderEvent(dom) {
	dom.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			isBlur = false;
			allow_to_add = true;
			const folder_data = { _id: 999, _belong: tree_selected.attrs._id, name: dom.value };
			const folder_obj = new FOLDER();
			const folder_entity = folder_obj.create_folder(folder_data);
			dom.parentNode.parentNode.appendChild(folder_entity);
			storeNewFile(folder_data);
			try {
				dom.parentNode.remove();
			} catch (err) {
				// console.log(err);
			}
		}
	});
}
