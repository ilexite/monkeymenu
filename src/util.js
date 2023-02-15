export function setStyles($, styles) {
	for (const [key, val] of Object.entries(styles)) $.style[key] = val;
}

window._MonkeyUtil = { setStyles };
