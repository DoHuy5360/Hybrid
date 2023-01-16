import TRAY from "../class/tray.js";
import CAKE from "../class/cake.js";

let tempCard;

const leftTray = document.querySelector(".frame-left-fool");
const leftTrayEntity = new TRAY(leftTray);
leftTrayEntity.config((control) => {
	control.dragover((thisTray) => {
		leftTrayEntity.addStyle("trayOverStyle");
	});
	control.dragleave((thisTray) => {
		leftTrayEntity.removeStyle("trayOverStyle");
	});
	control.drop((thisTray, e) => {
		thisTray.appendChild(tempCard);
		leftTrayEntity.removeStyle("trayOverStyle");
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
			cardEntity.addStyle("cardDragedStyle");
		});
		control.dragend(() => {
			cardEntity.removeStyle("cardDragedStyle");
		});
	});
});
