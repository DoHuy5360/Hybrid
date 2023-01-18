import { convertCode, getTemporary } from "../test/reference.js";
import DOM_FACTORY from "./DOM_factory.js";
import INTERACTIVE from "./interactive.js";

class COMPONENTS extends DOM_FACTORY {
	constructor() {
		super();
	}
	horizontal(slots = 1, css = {}) {
		const tray = this.create({
			type: "div",
			css,
			attribute: {
				draggable: false,
			},
		});
		for (let idx = 0; idx < slots; idx++) {
			const slot = new INTERACTIVE(
				this.create({
					type: "div",
					css: {
						width: `calc(100% / ${slots})`,
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
				// on.dragstart((thisSlot, e) => {
				// 	e.preventDefault();
				// 	console.log(1);
				// });
				on.dragover(() => {
					slot.add_class("dragOn");
				});
				on.dragleave(() => {
					slot.remove_class("dragOn");
				});
				on.drop((thisTray, e) => {
					slot.remove_class("dragOn");
					// thisTray.appendChild(getTemporary());
					const code = getTemporary().getAttribute("data-components");
					const domAfter = convertCode(code)();
					if (domAfter) {
						thisTray.appendChild(domAfter);
					}
				});
			});
			tray.appendChild(slot.zip());
		}
		// 	slot.can_move(true);
		// 	slot.control((on) => {
		// 		on.dragstart((thisSlot, e) => {
		// 			const time = new Date();
		// 			const idSeconds = time.getMilliseconds();
		// 			thisSlot.id = idSeconds;
		// 			e.dataTransfer.setData("idSeconds", idSeconds);
		// 		});
		// 		on.dragover(() => {
		// 			slot.add_class("dragOn");
		// 		});
		// 		on.dragleave(() => {
		// 			slot.remove_class("dragOn");
		// 		});
		// 		on.drop((thisSlot, e) => {
		// 			slot.remove_class("dragOn");
		// 			console.warn("Can not drop over slot!");
		// 		});
		// 	});
		// 	tray.appendChild(slot.zip());
		// }
		return tray;
	}
}

export default COMPONENTS;
