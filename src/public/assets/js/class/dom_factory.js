class DOM_FACTORY {
	constructor() {}
	create({ type = "div", text = "", css = {}, attribute = {} }) {
		const dom = document.createElement(type);
		dom.textContent = text;
		Object.assign(dom.style, css);
		if (Object.keys(attribute).length !== 0) {
			for (const attr in attribute) {
				if (Object.hasOwnProperty.call(attribute, attr)) {
					const attrValue = attribute[attr];
					dom.setAttribute(attr, attrValue);
				}
			}
		}
		return dom;
	}
}
export default DOM_FACTORY;
