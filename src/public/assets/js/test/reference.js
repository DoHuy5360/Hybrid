import COMPONENTS from "../class/components.js";
import CONTEXT_ACTION from "../class/context_action.js";
import DOM_FACTORY from "../class/DOM_factory.js";
import INTERACTIVE from "../class/interactive.js";

const contextHead = new CONTEXT_ACTION(document.getElementById("context-head"));

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
				attribute: { type: "button" },
			});
			const buttonInt = new INTERACTIVE(buttonObj);
			buttonInt.can_move(true);
			buttonInt.control((on) => {
				on.dragstart((thisBtn, e) => {
					setTemporary(thisBtn);
				});
				on.contextmenu((thisBtn) => {
					contextHead.set_context_for(thisBtn, ["_delete"]);
				});
			});
			return buttonObj;
		},
		header2: () => {
			const newTray = new COMPONENTS();
			return newTray.horizontal(4, {
				display: "flex",
				height: "100px",
				gap: "1px",
			});
		},
	};

	return checker[data] || getTemporary;
}

export { setTemporary, getTemporary, convertCode, contextHead };
