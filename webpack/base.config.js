/* global __dirname */
const webpack = require("webpack");
const path = require("path");
const process = require("process");
const pkg = require("../package.json");
const ma = pkg._moduleAliases || {};
const alias = Object.keys(ma).reduce((acc, key) => (acc[key] = path.resolve(__dirname, "../", ma[key]), acc), {});
const vasettings = pkg["va-release"] || {};
module.exports = (env = {}) => {
	console.log("env", env);
	return ({
		entry: `./src/index.mjs`,
		output: {
			path: path.resolve(__dirname, "../dist"),
			filename: `${pkg.name}${process.env.BROWSERSLIST_ENV === "modern" ? ".modern" : ""}.js`,
			library: vasettings.library,
			libraryExport: "default",
			libraryTarget: "umd",
			// publicPath: `/js/`,
			globalObject: "typeof self !== 'undefined' ? self : this",
		},
		resolve: {
			alias,
		},
		devtool: "source-map",
		module: {
			rules: [
				{
					test: /\.(js|mjs)$/,
					exclude: /(node_modules)/,
					use: [{
						loader: "babel-loader",
						options: {
							babelrc: true,
							// envName: "browser",
						},
					}],
				},
				{
					test: /(\.html|\.txt)$/,
					use: [
						{
							loader: "raw-loader",
						},
					],
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
			}),
		],
	});
};
