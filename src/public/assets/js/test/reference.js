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
			return buttonBank.create_button();
		},
		input: () => {
			const inpBank = new DOM_FACTORY();
			return inpBank.create_input();
		},
		textarea: () => {
			const textareaBank = new DOM_FACTORY();
			return textareaBank.create_textarea();
		},
		horizontal_socket: () => {
			const newTray = new COMPONENTS();
			return newTray.create_socket(2, { "flex-direction": "row" });
		},
		vertical_socket: () => {
			const newTray = new COMPONENTS();
			return newTray.create_socket(2, { "flex-direction": "column" });
		},
		slot: () => {
			const newSlot = new COMPONENTS();
			return newSlot.create_slot();
		},
	};

	return checker[data] || getTemporary;
}

export { setTemporary, getTemporary, convertCode, contextHead, contextLeft };
