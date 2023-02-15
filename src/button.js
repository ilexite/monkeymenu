import { setStyles } from "./util";

export class Button {
	$;
	$listening;

	parent;

	text;
	tooltip;

	keybind = {};

	constructor(parent, text, tooltip) {
		this.parent = parent;

		this.text = text;
		this.tooltip = tooltip;

		this.createButton();

		this.$listening = document.createElement("p");
		this.$listening.innerText = "Press a key or press ESC to cancel";

		setStyles(this.$listening, {
			// Reset all
			all: "initial",

			fontFamily: "Inter",
			fontSize: "18px",
			fontWeight: "medium",

			color: "#ddd",

			position: "absolute",
			display: "flex",

			inset: 0,

			justifyContent: "center",
			alignItems: "center",
		});
	}

	createButton() {
		this.$ = document.createElement("button");
		this.updateText();

		this.styleButton({
			// Reset all
			all: "initial",

			background: "rgba(34, 34, 34, 50%)",
			backdropFilter: "blur(50px) brightness(150%)",

			padding: "12px 16px",

			color: "#aaa",

			border: "none",
			borderRadius: "10px",

			fontFamily: "Inter",
			fontSize: "16px",

			cursor: "pointer",
			userSelect: "none",

			whiteSpace: "pre",

			transition: "filter 0.1s ease-in-out",
		});

		this.bindListeners();
	}

	styleButton(defaults) {
		setStyles(this.$, defaults);
	}

	bindListeners() {
		this.$.addEventListener("click", (event) => this.execute(event));

		this.$.addEventListener("contextmenu", (event) => {
			event.preventDefault();

			this.parent.empty();
			this.parent.$.appendChild(this.$listening);

			let oldBind = this.keybind;
			this.keybind = {};

			const done = () => {
				window.removeEventListener("keydown", callback);
				this.updateText();

				this.parent.$.removeChild(this.$listening);
				this.parent.restore();
			};

			const callback = (event) => {
				event.preventDefault();

				if (event.code == "Escape") return done();

				// Use the old bind if the window is closed
				// FIX: Only works if the menu is closed using the key
				if (event.code == this.parent.code) {
					this.keybind = oldBind;
					return done();
				}

				if (["Control", "Shift", "Alt", "Meta"].includes(event.key)) return;

				this.keybind = event;
				done();
			};

			window.addEventListener("keydown", callback);
		});

		let timeout;

		this.doubleEvent("mouseenter", "mouseleave", (which) => {
			setStyles(this.$, {
				filter: `brightness(${100 + 50 * which}%)`,
				transform: "translateY(0px)",
			});

			if (which) {
				timeout = setTimeout(() => {
					this.parent.showTooltip(true, this.tooltip);
				}, 1000);
			} else {
				clearInterval(timeout);
				this.parent.showTooltip(false, this.tooltip);
			}
		});

		this.doubleEvent("mousedown", "mouseup", (which) => {
			setStyles(this.$, {
				transform: `translateY(${2 * which}px)`,
			});
		});

		window.addEventListener("keydown", (event) => {
			if (event.code != this.keybind.code) return;
			if (event.shiftKey != this.keybind.shiftKey) return;
			if (event.ctrlKey != this.keybind.ctrlKey) return;
			if (event.altKey != this.keybind.altKey) return;

			event.preventDefault();
			this.execute();
		});
	}

	formatKeybind() {
		let str = "";

		if (!this.keybind.key) return str;

		str += "(";

		if (this.keybind.ctrlKey) str += "Ctrl+";
		if (this.keybind.shiftKey) str += "Shift+";
		if (this.keybind.altKey) str += "Alt+";

		str += this.keybind.key.toUpperCase();

		str += ")";

		return str;
	}

	doubleEvent(on, off, callback) {
		this.$.addEventListener(on, (event) => callback(true, event));
		this.$.addEventListener(off, (event) => callback(false, event));
	}

	updateText() {
		this.$.innerText = `${this.text} ${this.formatKeybind()}`.trim();
	}

	execute() {}
}

window._MonkeyButton = Button;
