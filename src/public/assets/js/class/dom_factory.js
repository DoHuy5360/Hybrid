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
	create_option(options = {}, { selected = 0 }) {
		const select = this.create({ type: "select", css: {} });
		Object.keys(options).forEach((opt, idx) => {
			const value = options[opt];
			const defaultSelect = selected == idx ? { selected: "selected" } : {};
			const option = this.create({ type: "option", text: opt, attribute: { value: value, ...defaultSelect } });
			select.appendChild(option);
		});
		return select;
	}
	create_data_list(id, values = []) {
		const dataList = this.create({ type: "datalist", attribute: { id } });
		values.forEach((value) => {
			const option = this.create({ type: "option", attribute: { value: value } });
			dataList.appendChild(option);
		});
		return dataList;
	}
}
export default DOM_FACTORY;
