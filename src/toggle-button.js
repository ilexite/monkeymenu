import { Button } from "./button";
import { setStyles } from "./util";

export class ToggleButton extends Button {
	enabled = false;

	constructor(...args) {
		super(...args);

		this.main();
	}

	toggle(enable = !this.enabled) {
		this.enabled = enable;
		this.updateStyle();
	}

	updateStyle() {
		setStyles(this.$, {
			outline: this.enabled ? "2px solid #479" : "none",
		});
	}

	execute() {
		this.toggle();
	}

	main() {}
}

window._MonkeyToggle = ToggleButton;
