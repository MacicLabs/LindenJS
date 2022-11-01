import "./style.css"

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