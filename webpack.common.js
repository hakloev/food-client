var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [

  ],
	resolve: {
	 modulesDirectories: ['node_modules'],
	 extensions: ['', '.js', '.jsx', '.scss']
 	},
  module: {
    loaders: [
			{
      	test: /\.jsx?$/,
      	loaders: ['babel'],
      	include: path.join(__dirname, 'src'),
				exclude: /node_modules/,
    	},
		]
  },
	sassLoader: {
    includePath: [path.resolve(__dirname, './styles')],
  },
};
