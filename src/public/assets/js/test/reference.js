import COMPONENTS from "../class/components.js";
import CONTEXT_ACTION from "../class/context_action.js";
import DOM_FACTORY from "../class/DOM_factory.js";
import INTERACTIVE from "../class/interactive.js";

const contextHead = new CONTEXT_ACTION(document.getElementById("context-head"));
const contextLeft = new CONTEXT_ACTION(document.querySelector(".config-option"));
contextLeft.search_field = document.getElementById("search-attribute");
let temporary;

function setTemporary(dom) {
	temporary = dom;
}
function getTemporary() {
	return temporary;
}
function convertCode(data) {
	const checker = {
		button: () => {
			const buttonBank = new DOM_FACTORY();
			const buttonObj = buttonBank.create({
				type: "button",
				text: "Punch me!",
				width: "100%",
				"word-break": "break-word",
				attribute: { type: "button" },
			});
			const buttonInt = new INTERACTIVE(buttonObj);
			buttonInt.can_move(true);
			buttonInt.control((on) => {
				on.dragstart((thisBtn, e) => {
					setTemporary(thisBtn);
				});
				on.contextmenu((thisBtn) => {
					contextLeft.set_context_for(thisBtn, ["_config"]);
					contextHead.set_context_for(thisBtn, ["_delete"]);
				});
			});
			return buttonObj;
		},
		input: () => {
			const inpBank = new DOM_FACTORY();
			const inpObj = inpBank.create({ type: "input", css: { width: "100%", height: "100%", resize: "unset" }, attribute: {} });
			const inpInt = new INTERACTIVE(inpObj);
			inpInt.can_move(true);
			inpInt.control((on) => {
				on.dragstart((thisInp) => {
					setTemporary(thisInp);
				});
				on.contextmenu((thisInp) => {
					contextLeft.set_context_for(thisInp, ["_config"]);
					contextHead.set_context_for(thisInp, ["_delete"]);
				});
			});
			return inpObj;
		},
		textarea: () => {
			const textareaBank = new DOM_FACTORY();
			const textareaObj = textareaBank.create({ type: "textarea", css: { width: "100%", height: "100%", resize: "unset" }, attribute: {} });
			const textareaInt = new INTERACTIVE(textareaObj);
			textareaInt.can_move(true);
			textareaInt.control((on) => {
				on.dragstart((thisArea) => {
					setTemporary(thisArea);
				});
				on.contextmenu((thisArea) => {
					contextLeft.set_context_for(thisArea, ["_config"]);
					contextHead.set_context_for(thisArea, ["_delete"]);
				});
			});
			return textareaObj;
		},
		horizontal_socket: () => {
			const newTray = new COMPONENTS();
			return newTray.socket(2, { "flex-direction": "row" });
		},
		vertical_socket: () => {
			const newTray = new COMPONENTS();
			return newTray.socket(2, { "flex-direction": "column" });
		},
		slot: () => {
			const newSlot = new COMPONENTS();
			return newSlot.slot();
		},
	};

	return checker[data] || getTemporary;
}

export { setTemporary, getTemporary, convertCode, contextHead, contextLeft };
