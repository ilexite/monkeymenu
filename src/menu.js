import { Close } from "./buttons/close";
import { Help } from "./buttons/help";
import { JSEval } from "./buttons/js-eval";
import { Panic } from "./buttons/panic";
import { setStyles } from "./util";

export class Menu {
	$;

	$title;
	$buttons;
	$tooltip;

	visible = false;
	code = "ShiftRight";

	buttons = [];

	mouseX = 0;
	mouseY = 0;

	constructor() {
		this.createMenu();

		this.addDefaultButtons();

		this.appendMenu();
		this.bindListeners();

		this.toggleMenu(false);
	}

	createMenu() {
		this.$ = document.createElement("div");
		this.$buttons = document.createElement("div");
		this.$tooltip = document.createElement("span");

		this.importAssets();

		this.styleMenu({
			// Reset all
			all: "initial",

			position: "fixed",
			inset: 0,

			background: "rgba(34, 34, 34, 80%)",
			backdropFilter: "blur(50px)",

			padding: "100px",

			zIndex: Number.MAX_SAFE_INTEGER,
		});

		setStyles(this.$buttons, {
			// Reset all
			all: "initial",

			display: "flex",

			marginTop: "20px",

			flexDirection: "row",
			flexGrow: 0,
			flexWrap: "wrap",

			gap: "10px",
		});

		setStyles(this.$tooltip, {
			// Reset all
			all: "initial",

			position: "fixed",

			background: "rgba(34, 34, 34, 50%)",
			backdropFilter: "blur(50px)",

			color: "#aaa",

			fontFamily: "Inter, sans-serif",
			fontSize: "12px",

			padding: "5px",
			borderRadius: "5px",

			opacity: "0%",
			pointerEvents: "none",

			transition: "opacity 0.1s ease-out",
		});

		this.$title = this.createTitle();

		this.$.appendChild(this.$title);
		this.$.appendChild(this.$buttons);
		this.$.appendChild(this.$tooltip);
	}

	importAssets() {
		const link = document.createElement("link");

		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "//fonts.googleapis.com/css2?family=Inter");

		this.$.appendChild(link);
	}

	styleMenu(defaults) {
		setStyles(this.$, defaults);
	}

	createTitle() {
		const title = document.createElement("h1");
		title.innerText = "MonkeyMenu";

		title.addEventListener("click", (event) => {
			const text = prompt().trim();
			title.innerText = text || "MonkeyMenu";
		});

		setStyles(title, {
			// Reset all
			all: "initial",

			fontFamily: "Inter, sans-serif",
			fontSize: "32px",
			fontWeight: "bold",

			color: "#fff",

			cursor: "pointer",
			userSelect: "none",
		});

		return title;
	}

	bindListeners() {
		window.addEventListener("keyup", (event) => {
			if (event.code != this.code) return;
			this.toggleMenu();
		});

		window.addEventListener("mousemove", (event) => {
			this.mouseX = event.pageX;
			this.mouseY = event.pageY;

			setStyles(this.$tooltip, {
				top: `${this.mouseY + 10}px`,
				left: `${this.mouseX + 10}px`,
			});
		});
	}

	addDefaultButtons() {
		this.addButton(new JSEval(this));
		this.addButton(new Panic(this));
		this.addButton(new Help(this));
		this.addButton(new Close(this));
	}

	addButton(button) {
		this.buttons.push(button);
		this.$buttons.appendChild(button.$);
	}

	appendMenu() {
		document.body.appendChild(this.$);
	}

	toggleMenu(visible = !this.visible) {
		this.visible = !!visible;

		setStyles(this.$, {
			display: visible ? "block" : "none",
		});
	}

	showTooltip(show, text) {
		this.$tooltip.innerText = text;

		setStyles(this.$tooltip, {
			opacity: `${show * 100}%`,
		});
	}

	empty(empty = true) {
		[this.$buttons, this.$title, this.$tooltip].forEach(($) => {
			if (empty) $.display = $.style.display;
			setStyles($, {
				display: empty ? "none" : $.display,
			});
		});
	}

	restore() {
		this.empty(false);
	}
}

window._MonkeyMenu = Menu;
