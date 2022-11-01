import "./style.css"

const parseRules = (rules) => {
	let rulesDict = {};
	for (let i of rules.split("\n")) {
		let key, value;
		[key, value] = i.split("=");
		rulesDict[key] = value;
	}
	return rulesDict;
}

const expandSystem = (axiom, rules, iterations) => {
	let newAxiom = axiom;
	for (let i = 0; i < iterations; i++) {
		let tmpAxiom = "";
		for (let j of newAxiom) {
			if (Object.keys(rules).includes(j)) {
				tmpAxiom += rules[j];
			}
			else {
				tmpAxiom += j;
			}
		}
		newAxiom = tmpAxiom;
	}
	return newAxiom;
}

document.addEventListener("DOMContentLoaded", () => {
	const axiom = document.getElementById("axiom");
	const rules = document.getElementById("rules");
	const iterations = document.getElementById("iterations");
	const angle = document.getElementById("angle");
	const size = document.getElementById("size");
	const draw = document.getElementById("draw");

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(1, -1);
	document.body.prepend(canvas);

	draw.onclick = () => drawSystem(expandSystem(axiom.value, parseRules(rules.value), iterations.valueAsNumber), angle.valueAsNumber, size.valueAsNumber, ctx);
})