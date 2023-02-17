const wrap_root = document.querySelector(".wrap-root");
fetch("/folder?root=true")
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
