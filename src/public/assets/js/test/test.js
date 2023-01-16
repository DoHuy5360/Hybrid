let dragedElement;

const fool = document.querySelector(".frame-left-fool");
fool.addEventListener("dragover", (e) => {
	e.preventDefault();
	Object.assign(fool.style, {
		"background-color": "lightgreen",
	});
});
fool.addEventListener("dragleave", (e) => {
	e.preventDefault();
	Object.assign(fool.style, {
		"background-color": "lightcyan",
	});
});
fool.addEventListener("drop", (e) => {
	Object.assign(fool.style, {
		"background-color": "lightcyan",
	});
	fool.appendChild(dragedElement);
	dragedElement = null;
});
const cards = document.querySelectorAll(".frame-right-fool-card");
cards.forEach((card) => {
	card.addEventListener("dragstart", (e) => {
		dragedElement = card;
		Object.assign(card.style, {
			outline: "3px dashed red",
		});
		fool.classList.add("fool-trigger");
	});
	card.addEventListener("drag", (e) => {
		const { clientX, clientY } = e;
	});
	card.addEventListener("dragend", (e) => {
		Object.assign(card.style, {
			"background-color": "lightsalmon",
			outline: "unset",
		});
		Object.assign(fool.style, {
			"background-color": "lightcyan",
		});
		fool.classList.remove("fool-trigger");
		dragedElement = null;
	});
});
