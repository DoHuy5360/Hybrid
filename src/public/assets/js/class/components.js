import { contextHead, contextLeft, convertCode, getTemporary, setTemporary } from "../test/reference.js";
import DOM_FACTORY from "./DOM_factory.js";
import INTERACTIVE from "./interactive.js";

class COMPONENTS extends DOM_FACTORY {
	constructor() {
		super();
	}
	socket(slots = 1, css = {}) {
		const tray = this.create({
			type: "div",
			css: {
				...css,
				display: "flex",
				gap: "4px",
				width: "100%",
				height: "100%",
			},
			attribute: {
				draggable: false,
			},
		});
		const trayInt = new INTERACTIVE(tray);
		trayInt.control((on) => {
			on.dragover(() => {
				trayInt.add_class("dragOn");
			});
			on.dragleave(() => {
				trayInt.remove_class("dragOn");
			});
			on.drop((thisTray, e) => {
				trayInt.remove_class("dragOn");
				const code = getTemporary().getAttribute("data-components");
				const domAfter = convertCode(code)();
				if (domAfter) {
					thisTray.appendChild(domAfter);
				}
			});
		});
		for (let idx = 0; idx < slots; idx++) {
			const slot = new INTERACTIVE(
				this.create({
					type: "div",
					css: {
						width: "100%",
						height: "100%",
						background: "#f5f5f550",
						display: "flex",
						gap: "4px",
						outline: "1px solid #f5f5f5",
					},
					attribute: {
						"data-components": "slot",
					},
				})
			);
			slot.can_move(false);
			slot.control((on) => {
				on.dragover(() => {
					slot.add_class("dragOn");
				});
				on.dragleave(() => {
					slot.remove_class("dragOn");
				});
				on.drop((thisSlot, e) => {
					slot.remove_class("dragOn");
					const code = getTemporary().getAttribute("data-components");
					const domAfter = convertCode(code)();
					if (domAfter) {
						thisSlot.appendChild(domAfter);
					}
				});
				on.contextmenu((thisSlot, e) => {
					const parent = thisSlot.parentNode;
					contextLeft.set_context_for(thisSlot, ["_config"]);
					contextHead.set_context_for(thisSlot, ["_delete", "_doSomething", "_parent"], () => {
						if (parent.childElementCount === 0) {
							parent.remove();
						}
					});
				});
				on.click((thisSlot) => {
					if (contextHead.previous_dom_selected) {
						contextHead.previous_dom_selected.classList.remove("selected");
					}
					contextHead.clear_inside(contextHead.identify);
				});
			});
			tray.appendChild(slot.zip());
		}
		return tray;
	}
	slot() {
		const slot = new INTERACTIVE(
			this.create({
				type: "div",
				css: {
					width: "100%",
					height: "100%",
					background: "#f5f5f550",
					display: "flex",
					gap: "4px",
					border: "3px dashed black",
				},
				// attribute: {
				// 	"data-components": "slot",
				// },
			})
		);
		slot.can_move(true);
		slot.control((on) => {
			on.dragstart((thisSlot) => {
				setTemporary(thisSlot);
			});
			on.dragover(() => {
				slot.add_class("dragOn");
			});
			on.dragleave(() => {
				slot.remove_class("dragOn");
			});
			on.drop((thisSlot, e) => {
				slot.remove_class("dragOn");
				const code = getTemporary().getAttribute("data-components");
				const domAfter = convertCode(code)();
				if (domAfter) {
					thisSlot.appendChild(domAfter);
				}
			});
			on.contextmenu((thisSlot, e) => {
				const parent = thisSlot.parentNode;
				contextLeft.set_context_for(thisSlot, ["_config"]);
				contextHead.set_context_for(thisSlot, ["_delete", "_doSomething", "_parent"], () => {
					// if (parent.childElementCount === 0) {
					// 	parent.remove();
					// }
				});
			});
			on.click((thisSlot) => {
				if (contextHead.previous_dom_selected) {
					contextHead.previous_dom_selected.classList.remove("selected");
				}
				contextHead.clear_inside(contextHead.identify);
			});
		});
		return slot.zip();
	}
}

export default COMPONENTS;
