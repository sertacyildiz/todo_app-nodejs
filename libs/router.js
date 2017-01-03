var User = mongoose.model('User');
var Boards = mongoose.model('Boards');
var Cards = mongoose.model('Cards');

var home = require(__dirname + "/../app/controllers/home");
var auth = require(__dirname + "/../app/controllers/auth");
var user = require(__dirname + "/../app/controllers/user");
var boards = require(__dirname + "/../app/controllers/boards");
var cards = require(__dirname + "/../app/controllers/cards");
var tasks = require(__dirname + "/../app/controllers/tasks");

var secure = function (req, res, next) {
	var cookieToken = req.cookies['token'];
	User.findOne({'tokens': cookieToken}).exec()
		.then(function (user) {
			if (user) {
				req.user = user;
				next();
			} else {
				res.json({
					"err": true,
					"msg": "User Logged out",
					"status": "BAD"
				});
			}
		})
		.then(null, function (err) {
			res.json({
				err: true,
				msg: err.name + " " + err.message
			});
		});
};
var board = function (req, res, next) {
	var boardID = req.body.bid;

	Boards.findOne({'_id': boardID}).exec()

		.then(function (boards) {
			if (boards) {
				req.board = boards;
				next();
			} else {
				res.json({
					"err": true,
					"msg": "Board Not Found",
					"status": "BAD"
				});
			}
		})
		.then(null, function (err) {
			res.json({
				err: true,
				msg: err.name + " " + err.message
			});
		});
};
var card = function (req, res, next) {
	var cardID = req.body.cid;

	Cards.findOne({'_id': cardID}).exec()

		.then(function (cards) {
			if (cards) {
				req.card = cards;
				next();
			} else {
				res.json({
					"err": true,
					"msg": "Card Not Found",
					"status": "BAD"
				});
			}
		})
		.then(null, function (err) {
			res.json({
				err: true,
				msg: err.name + " " + err.message
			});
		});
};

module.exports = function (app) {
	app.post("/", home.index);
	app.post("/auth/register", auth.register);
	app.post("/auth/login", auth.login);
	app.post("/auth/logout", auth.logout);
	app.post("/user/remove", secure, user.remove);
	app.post("/boards/create", secure, boards.create);
	app.post("/boards/update", secure, boards.update);
	app.post("/boards/remove", secure, boards.remove);
	app.post("/boards/list", secure, boards.list);
	app.post("/cards/create", secure,board, cards.create);
	app.post("/cards/remove", secure, cards.remove);
	app.post("/cards/update", secure,board, cards.update);
	app.post("/cards/orderupdate", secure,board, cards.orderupdate);
	app.post("/cards/list", secure,board, cards.list);
	app.post("/tasks/create", secure,card, tasks.create);
	app.post("/tasks/update", secure,card, tasks.update);
	app.post("/tasks/orderupdate", secure,card, tasks.orderupdate);
	app.post("/tasks/remove", secure, tasks.remove);
};