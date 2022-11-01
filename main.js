import "./style.css"

class Turtle {
	constructor(ctx, x=0, y=0, angle=90*Math.PI/180, history=[]) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.history = history;
	}

	fd(size) {
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		const dx = Math.cos(this.angle) * size;
		const dy = Math.sin(this.angle) * size;
		this.x += dx;
		this.y += dy;
		this.ctx.lineTo(this.x, this.y);
		this.ctx.stroke();
	}

	bk(size) {
		this.fd(-size);
	}

	lt(angle) {
		this.angle -= angle * Math.PI / 180
	}

	rt(angle) {
		this.lt(-angle);
	}

	save() {
		this.history.push([this.x, this.y, this.angle]);
	}

	restore() {
		let previousX, previousY, previousAngle;
		[previousX, previousY, previousAngle] = this.history.pop();
		this.x = previousX;
		this.y = previousY;
		this.angle = previousAngle;
	}
}

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

const drawSystem = (string, angle, size, ctx) => {
	ctx.clearRect(-(ctx.canvas.width / 2), (ctx.canvas.height / 2), ctx.canvas.width, -(ctx.canvas.height));
	const turtle = new Turtle(ctx);
	for (let i of string) {
		switch (i) {
			case "F": {
				turtle.fd(size);
				break;
			}
			case "f": {
				turtle.bk(size);
				break;
			}
			case "+": {
				turtle.lt(angle);
				break;
			}
			case "-": {
				turtle.rt(angle);
				break;
			}
			case "[": {
				turtle.save();
				break;
			}
			case "]": {
				turtle.restore();
				break;
			}
		}
	}
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