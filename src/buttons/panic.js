import { Button } from "../button";

export class Panic extends Button {
	constructor(parent) {
		super(parent, "Panic", "Remove MonkeyMenu from the page");

		this.keybind = {
			ctrlKey: true,
			shiftKey: true,
			altKey: false,
			code: "KeyX",
			key: "X",
		};

		this.updateText();
	}

	execute() {
		this.parent.buttons.forEach((button) => {
			if (button.enabled) button.toggle(false);
		});

		document.body.removeChild(this.parent.$);

		delete window._MonkeyMain;
		delete window._MonkeyMenu;
		delete window._MonkeyButton;
		delete window._MonkeyToggle;
		delete window._MonkeyClose;
		delete window._MonkeyUtil;
	}
}
