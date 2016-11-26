var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./webpack.common');

config.entry = {
	entry: [
		'./src/index'
	],
}

config.module.loaders.push(
	{
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style', 'css!sass'),
	}
)

config.plugins.push(
	new webpack.NoErrorsPlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
			DEBUG: JSON.stringify('false'),
		}
	}),
	new ExtractTextPlugin('[name].css'),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	})
)

module.exports = config;
