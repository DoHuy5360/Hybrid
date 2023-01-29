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
	on.drop(async (thisTray) => {
		const cake_dropped = getTemporary();
		const code = cake_dropped.getAttribute("data-code");
		const html = await fetch(`http://localhost:4000/cake/${code}`).then((res) => res.text());
		thisTray.insertAdjacentHTML("beforeend", html);
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
const cakes = document.querySelectorAll(".cake");
cakes.forEach((cake) => {
	const cakeEntity = new INTERACTIVE(cake);
	cakeEntity.can_move(true);
	cakeEntity.control((on) => {
		on.dragstart((thisCake, e) => {
			setTemporary(thisCake);
		});
		on.dragend((thisCake, e) => {
			console.log(2);
		});
	});
});
