import TRAY from "../class/tray.js";
import CAKE from "../class/cake.js";

let tempCard;
const leftTray = document.querySelector(".frame-left-fool");
const leftTrayEntity = new TRAY(leftTray);
leftTrayEntity.config((control) => {
	control.dragover((thisTray, { clientY, clientX, offsetY, offsetX }) => {
		leftTrayEntity.addStyle("trayOverStyle");
	});
	control.dragleave((thisTray) => {
		leftTrayEntity.removeStyle("trayOverStyle");
	});
	control.drop((thisTray, e) => {
		e.stopImmediatePropagation();
		e.stopPropagation();
		leftTrayEntity.removeStyle("trayOverStyle");
		thisTray.appendChild(tempCard);
	});
});

const rightTray = document.querySelector(".frame-right-fool");
const rightTrayEntity = new TRAY(rightTray);
rightTrayEntity.config((control) => {
	control.dragover((thisTray) => {
		rightTrayEntity.addStyle("trayOverStyle");
	});
	control.dragleave((thisTray) => {
		rightTrayEntity.removeStyle("trayOverStyle");
	});
	control.drop((thisTray) => {
		thisTray.appendChild(tempCard);
		rightTrayEntity.removeStyle("trayOverStyle");
	});
});

const listCards = document.querySelectorAll(".frame-right-fool-card");
listCards.forEach((card) => {
	const cardEntity = new CAKE(card);
	cardEntity.config((control) => {
		control.dragstart((thisCard, e) => {
			tempCard = thisCard;
			// cardEntity.addStyle("cardDragedStyle");
		});
		control.dragend(() => {
			// cardEntity.removeStyle("cardDragedStyle");
		});
	});
	const cardEntity2 = new TRAY(card);
	cardEntity2.config((control) => {
		control.dragover((thisCard, e) => {
			e.stopImmediatePropagation();
			cardEntity2.addStyle("slotOverStyle");
		});
		control.dragleave((thisCard, e) => {
			e.stopImmediatePropagation();
			cardEntity2.removeStyle("slotOverStyle");
		});
		control.drop((thisCard, e) => {
			e.stopImmediatePropagation();
			const { offsetY } = e;
			if (offsetY > thisCard.offsetHeight / 2) {
				thisCard.insertAdjacentElement("afterend", tempCard);
			} else {
				thisCard.parentNode.insertBefore(tempCard, thisCard);
			}
			cardEntity2.removeStyle("slotOverStyle");
		});
	});
});
