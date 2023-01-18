import COMPONENTS from "../class/components.js";
import DOM_FACTORY from "../class/DOM_factory.js";
import INTERACTIVE from "../class/interactive.js";

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

	return checker[data] || echo;
}
function echo() {
	alert("Invalid");
}

export { setTemporary, getTemporary, convertCode };
