const fool = document.getElementById("fool");
fool.addEventListener("dragover", (e) => {
	e.preventDefault();
	Object.assign(fool.style, {
		"background-color": "lightpink",
	});
});
fool.addEventListener("dragleave", (e) => {
	e.preventDefault();
	Object.assign(fool.style, {
		"background-color": "lightcyan",
	});
});
fool.addEventListener("drop", (e) => {
	console.log("drop");
	Object.assign(fool.style, {
		"background-color": "lightcyan",
	});
});
const cards = document.querySelectorAll(".frame-right-card");
cards.forEach((card) => {
	card.addEventListener("drag", (e) => {
		Object.assign(card.style, {
			"background-color": "lightgreen",
			outline: "3px dashed lightsalmon",
		});
	});
	card.addEventListener("dragend", (e) => {
		console.log("drag end");
		Object.assign(card.style, {
			"background-color": "lightsalmon",
			outline: "unset",
		});
		Object.assign(fool.style, {
			"background-color": "lightcyan",
		});
	});
});
