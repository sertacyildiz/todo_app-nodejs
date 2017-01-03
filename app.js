
var express = require('express');
var config = require('./libs/config');
var db = require('./libs/db');

var app = express();

db(function () {
	require('./libs/express')(app, function () {
		app.listen(config.port, function () {console.log("[Port]", config.port);});
	});
});




