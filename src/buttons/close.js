import { Button } from "../button";

export class Close extends Button {
	constructor(parent) {
		super(parent, "Close", "Close the menu");
	}

	execute() {
		this.parent.toggleMenu(false);
	}
}

window._MonkeyClose = Close;
