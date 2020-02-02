/* global __dirname */
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./base.config.js");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env = {}) => {
	const result = merge(baseConfig(env), {
		mode: "production",
		optimization: {
			minimizer: [
				new TerserPlugin({
					sourceMap: true,
				}),
			],
		},
	});
	// result.plugins.push(new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000}));

	return result;
};
