const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const banner = readFileSync(resolve(__dirname, "banner.js"), "utf8");

module.exports = {
	output: {
		filename: "menu.user.js",
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					output: {
						beautify: false,
						preamble: banner,
					},
				},
			}),
		],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner,
			raw: true,
			entryOnly: true,
		}),
	],
	mode: "production",
	devtool: "inline-cheap-module-source-map",
};
