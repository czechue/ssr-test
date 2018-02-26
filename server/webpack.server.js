const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
	// Inform webpack that were building a bundle for nodeJS,
	// rather than for the browser
	target: 'node',

	// tell webpack the root file of server app
	entry: './src/index.js',

	// tell webpack where to put output file
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
