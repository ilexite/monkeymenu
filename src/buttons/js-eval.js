import { Button } from "../button";

export class JSEval extends Button {
	constructor(parent) {
		super(parent, "JS evaluator", "Evaluate JavaScript expressions");
	}

	execute() {
		const code = prompt("Code");
		alert(eval(code));
	}
}
