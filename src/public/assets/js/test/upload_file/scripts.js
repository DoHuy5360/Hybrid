const list_folder = [
	{ _id: 0, _belong: -1, name: "folder name 0" },
	{ _id: 1, _belong: 0, name: "folder name 1" },
	{ _id: 2, _belong: 0, name: "folder name 2" },
	{ _id: 3, _belong: 0, name: "folder name 3" },
	{ _id: 4, _belong: 2, name: "folder name 4" },
	{ _id: 5, _belong: 2, name: "folder name 5" },
	{ _id: 6, _belong: 3, name: "folder name 6" },
	{ _id: 7, _belong: 4, name: "folder name 7" },
];
const list_file = [
	{ _id: 0, _belong: 0, name: "file name 0" },
	{ _id: 1, _belong: 0, name: "file name 1" },
	{ _id: 2, _belong: 0, name: "file name 2" },
	{ _id: 3, _belong: 0, name: "file name 3" },
	{ _id: 4, _belong: 2, name: "file name 4" },
	{ _id: 5, _belong: 2, name: "file name 5" },
	{ _id: 6, _belong: 3, name: "file name 6" },
	{ _id: 7, _belong: 4, name: "file name 7" },
];

const root = document.querySelector(".root");
list_folder.forEach((folder) => {
	const branch = createDom({ name: "li", className: "branch" });
	const tree = createDom({ name: "div", className: "tree" });
	tree.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-folder"></i>');
	// <i class="fa-regular fa-folder-open"></i>
	const name = createDom({ name: "div", text: folder.name });
	tree.appendChild(name);
	const branch_view = createDom({ name: "ul", className: "branch-view", _id: folder._id });
	branch.appendChild(tree);
	branch.appendChild(branch_view);
	const tree_body = document.querySelector(`[data-id="${folder._belong}"]`);
	tree_body.appendChild(branch);
});
list_file.forEach((file) => {
	const leaf = createDom({ name: "li", className: "leaf" });
	const name = createDom({ name: "div", text: file.name });
	leaf.appendChild(name);
	leaf.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-file"></i>');
	const tree_body = document.querySelector(`[data-id="${file._belong}"]`);
	tree_body.appendChild(leaf);
});

function createDom({ name, className = "", text = "", _id = "" }) {
	const de = document.createElement(name);
	de.setAttribute("class", className);
	de.setAttribute("data-id", _id);
	de.textContent = text;
	return de;
}

let tree_selected;

const trees = document.querySelectorAll(".tree");
trees.forEach((tree) => {
	assignSelectFolder(tree);
});
function assignSelectFolder(tree) {
	tree.addEventListener("click", (e) => {
		const parent_tree = tree.parentNode;
		parent_tree.querySelector(".branch-view").classList.toggle("visible");
		if (tree_selected) {
			tree_selected.classList.remove("selected");
		}
		tree_selected = tree;
		tree_selected.classList.add("selected");
	});
}
let allow_to_add = true;
const add_file = document.querySelector(".add-file");
add_file.addEventListener("click", (e) => {
	if (tree_selected && allow_to_add) {
		allow_to_add = false;
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
const add_folder = document.querySelector(".add-folder");
add_folder.addEventListener("click", (e) => {
	if (tree_selected && allow_to_add) {
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
			const leaf = createDom({ name: "li", className: "leaf", text: dom.value });
			dom.parentNode.appendChild(leaf);
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
			const branch = createDom({ name: "li", className: "branch" });
			const tree = createDom({ name: "div", className: "tree", text: dom.value });
			const branch_view = createDom({ name: "ul", className: "branch-view" });

			branch.appendChild(tree);
			assignSelectFolder(tree);
			branch.appendChild(branch_view);

			dom.parentNode.appendChild(branch);
			try {
				dom.remove();
			} catch (err) {
				// console.log(err);
			}
		}
	});
}
