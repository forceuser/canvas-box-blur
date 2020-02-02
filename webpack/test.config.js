/* global __dirname */
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const webpack = require("webpack");

module.exports = (env = {}) => {
	const result = merge(baseConfig(env), {
		mode: "development",
	});
	result.target = "node";
	result.entry = [
		"@babel/polyfill",
		path.resolve(__dirname, "../test/index.js"),
	];
	result.output = {
		path: path.resolve(__dirname, "../test/build"),
		filename: "index.js",
	};

	// result.plugins.push(new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000}));

	return result;
};
