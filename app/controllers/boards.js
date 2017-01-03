
var Boards = mongoose.model('Boards');

module.exports = {
	create: function (req, res) {

		Boards.count({}).exec()

			.then(function (count) {
				var boards = new Boards();

				boards._uid = req.user._id;
				boards.title = req.body.title;

				return boards.save().then(function (boardsAfterSave) {
					res.json({
						err: false,
						data: {_id: boardsAfterSave._id,title:boardsAfterSave.title}
					});
				});
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	},

	update: function (req, res) {

		var uid = req.user._id;
		var id = req.body.bid;
		var title = req.body.title;
		var order = req.body.order;
		var isActive = req.body.isActive;

		Boards.update({_id: id}, {$set: {_uid: uid, title: title, order: order, isActive: isActive}})

			.then(function () {
				res.json({
					err: false,
					status: "OK"
				})
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});

	},

	remove: function (req, res) {
		var id = req.body.bid;

		Boards.remove({_id: id}).exec()
			.then(function () {
				res.json({
					err: false,
					msg: "Delete Done !"
				});
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			})
	},

	list: function(req,res){

		Boards.count().exec()
			.then(function (count) {
				Boards.find({'_uid':req.user._id}).exec()
					.then(function (response) {
						res.json({
							err: false,
							data: response
						});
					})
					.then(null, function (err) {
						res.json({
							err: true,
							msg: err.name + " " + err.message
						});
					})
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			})
	}
};