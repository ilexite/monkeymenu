import { Button } from "../button";
import { setStyles } from "../util";

export class Help extends Button {
	$help;

	constructor(parent) {
		super(parent, "Help", "Show help");

		this.keybind = {
			ctrlKey: false,
			shiftKey: false,
			altKey: false,
			code: "F1",
			key: "F1",
		};

		this.updateText();

		this.$help = document.createElement("p");
		this.$help.innerText = [
			"MonkeyMenu is opened using RSHIFT by default.",
			"This binding can be changed in the options menu.",
			"\n\n",
			"You can bind a button to a shortcut on your keyboard",
			"by right-clicking the button and pressing the key",
			"combination you would like to use.",
			"",
			"To clear a button bind, right-click the button and",
			"press ESCAPE.",
			"\n\n",
			"The panic button is used to remove MonkeyMenu from",
			"the current page, in case of emergency. It is bound",
			"to Control+Shift+X by default.",
			"",
			"Panic will also disable active toggles.",
			"\n\n",
			"Press ESCAPE to return to MonkeyMenu.",
		].join(" ");

		setStyles(this.$help, {
			// Reset all
			all: "initial",

			fontFamily: "Inter, sans-serif",
			fontSize: "16px",

			lineHeight: "22px",

			color: "#ddd",

			maxWidth: "1000px",
			margin: "auto",

			display: "block",
		});
	}

	execute() {
		let wasOpen = this.parent.visible;

		this.parent.toggleMenu(true);
		this.parent.empty();

		this.parent.$.appendChild(this.$help);

		const callback = (event) => {
			if (event.code != "Escape") return;

			this.parent.$.removeChild(this.$help);
			this.parent.restore();

			this.parent.toggleMenu(wasOpen);

			window.removeEventListener("keydown", callback);
		};

		window.addEventListener("keydown", callback);
	}
}
