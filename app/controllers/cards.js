
var Cards = mongoose.model('Cards');

module.exports = {
	create: function (req, res) {
    console.log(req);
		Cards.count({}).exec()
			.then(function (count) {
				var cards = new Cards({});

				cards._bid = req.board._id;
				cards._uid = req.user._id;
				cards.title = req.body.title;

				return cards.save().then(function (cardsAfterSave) {
					res.json({
						err: false,
						data: {_id: cardsAfterSave._id, title: cardsAfterSave.title}
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
		var bid = req.board._id;
    	var uid = req.user._id;
    	var id = req.body.cid;
		var title = req.body.title;
		var order = req.body.order;
		var isActive = req.body.isActive;

		Cards.update({_id: id}, {$set: {_bid: bid,_uid: uid, title: title, order: order, isActive: isActive}})

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

	orderupdate: function (req, res) {
		var bid = req.board._id;
    	var uid = req.user._id;
    	var id = req.body.cid;
		var title = req.body.title;
		var order = req.body.order;
		var isActive = req.body.isActive;

		Cards.update({_id: id}, {$set: {_bid: bid,_uid: uid, title: title, order: order, isActive: isActive}})

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
		var id = req.body.cid;

		Cards.remove({_id: id}).exec()
			.then(function () {
				res.json({
					err: false,
					msg: "Delete Done !",
					status: "OK"
				});
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			})
	},

	list: function (req, res) {

		Cards.count().exec()
			.then(function(count){
				Cards.find({'_bid':req.board._id}).exec()
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