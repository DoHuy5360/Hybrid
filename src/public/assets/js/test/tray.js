import INTERACTIVE from "../class/interactive.js";
import { getTemporary, setTemporary } from "./reference.js";

const tray = document.querySelector("#tray");

const tray_entity = new INTERACTIVE(tray);
tray_entity.can_move(false);
tray_entity.control((on) => {
	on.dragover(() => {
		tray_entity.add_class("dragoverTrigger");
	});
	on.dragleave(() => {
		tray_entity.remove_class("dragoverTrigger");
	});
	on.drop((thisTray) => {
		const cake_dropped = getTemporary();
		thisTray.appendChild(cake_dropped);

		tray_entity.remove_class("dragoverTrigger");
	});
});
const components_tray = document.querySelector("#components_tray");

const components_tray_entity = new INTERACTIVE(components_tray);
components_tray_entity.can_move(false);
components_tray_entity.control((on) => {
	on.dragover(() => {
		components_tray_entity.add_class("dragoverTrigger");
	});
	on.dragleave(() => {
		components_tray_entity.remove_class("dragoverTrigger");
	});
	on.drop((thisTray) => {
		thisTray.appendChild(getTemporary());
		components_tray_entity.remove_class("dragoverTrigger");
	});
});
async function getComponents() {
	const codes = ["header1", "youtube_header"];
	for (let idx = 0; idx < codes.length; idx++) {
		const code = codes[idx];
		const response = await fetch(`http://localhost:4000/cake/${code}`).then((res) => res);
		if (response.ok) {
			components_tray.insertAdjacentHTML("beforeend", await response.text());
		}
	}
	setMicrowave();
}
getComponents();
function setMicrowave() {
	const cakes = document.querySelectorAll(".cake");
	cakes.forEach((cake) => {
		const cakeEntity = new INTERACTIVE(cake);
		cakeEntity.can_move(true);
		cakeEntity.control((on) => {
			on.dragstart((thisCake, e) => {
				setTemporary(thisCake);
			});
			on.dragend((thisCake, e) => {});
		});
	});
}
