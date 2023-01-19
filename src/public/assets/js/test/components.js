import INTERACTIVE from "../class/interactive.js";
import HEADER from "./components/header.js";
import COMPONENTS from "../class/components.js";
import DOM_FACTORY from "../class/DOM_factory.js";
import { setTemporary, getTemporary, convertCode, contextHead } from "./reference.js";

const wrapObjects = document.querySelector(".wrap");
wrapObjects.addEventListener("dragstart", (e) => {
	e.preventDefault();
	//! Prevent weird objects can dragged
});

const dragObjects = document.querySelectorAll(".drag-obj");
dragObjects.forEach((obj) => {
	const domObject = new INTERACTIVE(obj);
	domObject.can_move(true);
	domObject.control((on) => {
		on.dragstart((thisObj, e) => {
			setTemporary(thisObj);
		});
	});
});
const dropObject = document.querySelectorAll(".drop-field");
dropObject.forEach((obj) => {
	const domObject = new INTERACTIVE(obj);
	domObject.can_move(false);
	domObject.control((on) => {
		on.dragstart((thisDrop, e) => {
			e.preventDefault();
		});
		on.dragover(() => {
			domObject.add_class("dropOn");
		});
		on.dragleave(() => {
			domObject.remove_class("dropOn");
		});
		on.drop((thisObj) => {
			domObject.remove_class("dropOn");
			const code = getTemporary().getAttribute("data-components");
			const domAfter = convertCode(code)();
			if (domAfter) {
				thisObj.appendChild(domAfter);
			}
		});
		on.contextmenu((thisDrop) => {
			contextHead.set_context_for(thisDrop, ["_clear"]);
		});
	});
});
const frameMain = document.querySelector(".wrap-left-contain-tray");
const frameWidth = document.getElementById("frame-width");
const frameHeight = document.getElementById("frame-height");
frameWidth.addEventListener("change", (e) => {
	frameMain.style.width = frameWidth.value;
});
frameHeight.addEventListener("change", (e) => {
	frameMain.style.height = frameHeight.value;
});
const frameSize = document.getElementById("frame-size");
frameSize.addEventListener("change", (e) => {
	const [width, height] = frameSize.value.split(".");
	frameMain.style.width = width;
	frameMain.style.height = height;
	let newW = replaceUnit(width);
	let newH = replaceUnit(height);
	frameWidth.value = newW;
	frameHeight.value = newH;
});
function replaceUnit(arg) {
	let replacePercent = arg.replace("%", "");
	let replacePixel = replacePercent.replace("px", "");
	return replacePixel;
}
