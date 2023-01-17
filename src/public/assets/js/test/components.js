import INTERACTIVE from "../class/interactive.js";
import HEADER from "./components/header.js";

let temporary;
const dragObjects = document.querySelectorAll(".drag-obj");
dragObjects.forEach((obj) => {
	const domObject = new INTERACTIVE(obj);
	domObject.can_move(true);
	domObject.control((on) => {
		on.dragstart((thisObj) => {
			temporary = thisObj;
		});
	});
});
const dropObject = document.querySelectorAll(".drop-field");
dropObject.forEach((obj) => {
	const domObject = new INTERACTIVE(obj);
	domObject.control((on) => {
		on.dragover(() => {
			domObject.add_class("dropOn");
		});
		on.dragleave(() => {
			domObject.remove_class("dropOn");
		});
		on.drop((thisObj) => {
			domObject.remove_class("dropOn");
			// thisObj.appendChild(temporary);
			const code = temporary.getAttribute("data-components");
			const domeAfter = convertCode(code)();
			if (domeAfter) {
				console.log(domeAfter);
				thisObj.appendChild(domeAfter);
			}
		});
	});
});
function convertCode(data) {
	const deTag = document.createElement("div");
	deTag.textContent = "Hell";
	const checker = {
		header: () => {
			const de = new HEADER();
			de.background("lightpink");
			de.addChild([deTag]);
			const deDrag = new INTERACTIVE(de.zip());
			deDrag.can_move(true);
			deDrag.control((on) => {
				on.dragover(() => {
					deDrag.add_class("dragOn");
				});
				on.dragleave(() => {
					deDrag.remove_class("dragOn");
				});
				on.drop(() => {
					deDrag.remove_class("dragOn");
				});
			});
			return de.zip();
		},
		header2: () => {
			return horizontal(4);
		},
		slot: () => {
			return temporary;
		},
	};

	return checker[data] || echo;
}
function echo() {
	alert("Invalid");
}
function create(type = "div", css = {}, attribute = {}) {
	const dom = document.createElement(type);
	Object.assign(dom.style, css);
	if (Object.keys(attribute).length !== 0) {
		for (const attr in attribute) {
			if (Object.hasOwnProperty.call(attribute, attr)) {
				const attrValue = attribute[attr];
				dom.setAttribute(attr, attrValue);
			}
		}
	}
	return dom;
}
function horizontal(slots = 1) {
	const tray = create("div", {
		display: "flex",
		gap: "5px",
		width: "400px",
		height: "100px",
		outline: "2px solid lightblue",
	});

	for (let idx = 0; idx < slots; idx++) {
		const slot = new INTERACTIVE(
			create(
				"div",
				{
					width: `calc(100% / ${slots})`,
					height: "100%",
					background: "lightgreen",
					cursor: "grab",
				},
				{
					"data-components": "slot",
				}
			)
		);
		slot.can_move(true);
		slot.control((on) => {
			on.dragstart((thisSlot) => {
				temporary = thisSlot;
				console.log(temporary);
			});
			on.dragover(() => {
				slot.add_class("dragOn");
			});
			on.dragleave(() => {
				slot.remove_class("dragOn");
			});
			on.drop(() => {
				slot.remove_class("dragOn");
			});
		});
		tray.appendChild(slot.zip());
	}
	return tray;
}
