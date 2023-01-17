function node({ type = "div", text = "" }) {
	const element = document.createElement(type);
	element.textContent = text;
	return element;
}

class HEADER {
	constructor() {
		this.wrap = node({});
	}
	background(color = "white") {
		this.wrap.style.backgroundColor = color;
	}
	addChild(nodes = []) {
		if (nodes.length !== 0) {
			nodes.forEach((element) => {
				this.wrap.appendChild(element);
			});
		} else {
			this.wrap.appendChild(node({ text: "child" }));
		}
	}
	zip() {
		return this.wrap;
	}
}

export default HEADER;
