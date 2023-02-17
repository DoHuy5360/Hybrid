const wrap_root = document.querySelector(".wrap-folder");
fetch("/folder?isRoot=true&_root=root")
	.then((res) => res.json())
	.then((data) => {
		data.folders_collection.forEach((folder) => {
			const folder_obj = createFolder(folder);
			wrap_root.appendChild(folder_obj);
		});
	});
function createFolder({ _id, name }) {
	const wrap = document.createElement("a");
	wrap.setAttribute("class", "folder-wrapper");
	wrap.href = `/inspect/${_id}`;
	wrap.insertAdjacentHTML("afterbegin", '<i class="fa-solid fa-folder"></i>');
	const folder_name = document.createElement("div");
	folder_name.textContent = name;
	wrap.appendChild(folder_name);
	eventClick(wrap);
	return wrap;
}
function eventClick(folder) {
	folder.addEventListener("click", (e) => {});
}
const add_folder = document.querySelector("#add-folder");
add_folder.addEventListener("click", (e) => {
	const folder_name = prompt("Enter folder name");
	if (folder_name) {
		fetch("/folder", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				_belong: "root",
				_root: "root",
				name: folder_name,
				isRoot: true,
			}),
		});
	}
});
