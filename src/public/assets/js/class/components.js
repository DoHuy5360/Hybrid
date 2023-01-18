import { contextHead, convertCode, getTemporary } from "../test/reference.js";
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
		for (let idx = 0; idx < slots; idx++) {
			const slot = new INTERACTIVE(
				this.create({
					type: "div",
					css: {
						width: "100%",
						height: "100%",
						background: "#f5f5f550",
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
					contextHead.set_context_for(thisSlot, ["_delete", "_doSomething"], () => {
						if (parent.childElementCount === 0) {
							parent.remove();
						}
					});
				});
			});
			tray.appendChild(slot.zip());
		}
		return tray;
	}
}

export default COMPONENTS;
