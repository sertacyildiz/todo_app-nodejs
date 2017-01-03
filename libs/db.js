global.mongoose = require('mongoose');
var fs = require('fs');

module.exports = function (callback) {
	mongoose.connect('mongodb://ds063424-a1.mongolab.com:63424/thetodo', {
			user: "thetodouser",
			pass: "PLN6ysz3NhZFSzmR",
			replset: "ds063424-a0.mongolab.com:63424/thetodo?replicaSet=rs-ds063424"
		},
		function (err) {
			if (err) {
				console.log('connection error', err);
			} else {
				console.log('connection successful');
			}
		});

	fs.readdirSync(__dirname + '/../app/models').forEach(function (file) {
		file.indexOf('.js') != -1 ? require(__dirname + '/../app/models/' + file) : false;
	});
	callback();
};