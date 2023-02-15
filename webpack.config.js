const webpack = require("webpack");

const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const banner = readFileSync(resolve(__dirname, "banner.js"), "utf8");

module.exports = {
	output: {
		filename: "menu.user.js",
	},
	plugins: [new webpack.BannerPlugin({ banner, raw: true })],
	mode: "production",
	devtool: "inline-cheap-module-source-map",
};
