var webpack = require('webpack');

var config = require('./webpack.common');

config.entry = {
	entry: [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
		'./src/index'
	],
}

config.module.loaders.push(
	{
		test: /\.scss$/,
		loaders: ['style', 'css', 'sass'],
	}
)

config.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('development'),
			DEBUG: JSON.stringify('true'),
		}
	})
)

module.exports = config;
