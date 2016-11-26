var path = require('path');
var webpack = require('webpack');
var express = require('express');
var httpProxy = require("http-proxy");
var config = require('./webpack.config.dev');

var debug = require('debug');

var app = express();
var apiProxy = httpProxy.createProxyServer();
var compiler = webpack(config);

var log = {
  pack: debug('webpack'),
  hot: debug('hotreload')
};

app.use(require('webpack-hot-middleware')(compiler, {
	log: log.pack,
	path: '/__webpack_hmr',
	heartbeat: 10 * 100
}));

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
  publicPath: config.output.publicPath,
	stats: {
		colors: true,
		reasons: false,
	}
}));

app.use('/api/*', (req, res) => {
	console.log(req.baseUrl);
	req.url = req.baseUrl.endsWith('/') ? req.baseUrl: `${req.baseUrl}/`;
	apiProxy.web(req, res, {
		target: {
			port: 8000,
			host: 'localhost',
		}
	});
});


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
})
