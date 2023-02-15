# MonkeyMenu

A menu for TamperMonkey and ViolentMonkey.

## Building

```bash
npm install
npx webpack
```

## Modules

### API

Most classes are available through these identifiers:

```js
window._MonkeyMain; // Main menu (instance)
window._MonkeyMenu; // Menu class
window._MonkeyButton; // Button class
window._MonkeyToggle; // Toggle button class
window._MonkeyClose; // Close button class
```

Utility functions such as `setStyles` are available though `window._MonkeyUtil`.

Remember that the `window.` prefix is optional and may be omitted.

### Custom buttons

```js
// Create a class which inherits _MonkeyButton
class MyButton extends _MonkeyButton {
	constructor(parent) {
		// `parent` is the menu we are attaching the button to.
		// The 2nd argument is the text on the button.
		// The 3rd argument is the tooltip shown when hovering over the button.
		super(parent, "My button", "Shows a message");
	}

	// Runs when the button is clicked or when its keybind is pressed
	execute() {
		alert("a message");
	}
}

// Add the button to MonkeyMenu
_MonkeyMain.addButton(new MyButton(_MonkeyMain));
```

### Custom menus

Menus require slightly more work than buttons, but follow a similar principle.

```js
// Bring `setStyles` into the current context
const { setStyles } = _MonkeyUtil;

// Create a class which inherits _MonkeyMenu
class MyMenu extends _MonkeyMenu {
	constructor() {
		super();

		// Disable "RSHIFT to open"
		this.code = "";
	}

	createTitle() {
		const title = document.createElement("h1");
		title.innerText = "My Menu";

		setStyles(title, {
			// Reset all styles
			all: "initial",

			// Use the same font as the main title
			fontFamily: "Inter, sans-serif",
			fontSize: "32px",
			fontWeight: "bold",

			// Use the same color as the main title
			color: "#fff",
			userSelect: "none",
		});

		return title;
	}

	// Override which buttons are added by default
	addDefaultButtons() {
		// This is the button we created earlier
		this.addButton(new MyButton(this));

		// This is the close button
		this.addButton(new _MonkeyClose(this));
	}
}

// Another button, this one will take us to our menu
class GotoMyMenu extends _MonkeyButton {
	myMenu;

	constructor(parent) {
		super(parent, "My Menu", "Open My Menu");
		this.myMenu = new MyMenu(); // Create an instance of our menu
	}

	execute() {
		// Hides the main menu and shows our menu when pressed
		this.parent.toggleMenu(false);
		this.myMenu.toggleMenu(true);
	}
}

// Add the button to the main menu
_MonkeyMain.addButton(new GotoMyMenu(_MonkeyMain));
```
