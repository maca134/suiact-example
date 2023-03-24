const WrapperPlugin = require('wrapper-webpack-plugin');

module.exports = {
	mode: "production",
	entry: `./src/main.tsx`,
	target: false,
	output: {
		filename: `main.jsx`,
		chunkFormat: 'array-push',
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new WrapperPlugin({
			test: /\.jsx$/,
			header: `(function (self) { var parentPanel = self instanceof Panel ? self : undefined;\n`,
			footer: `\n})(this);`
		})
	]
};
