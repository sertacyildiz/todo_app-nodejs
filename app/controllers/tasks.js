
var Cards = mongoose.model('Cards');

module.exports = {
	create: function (req, res) {

		var cardID = req.card._id;
		Cards.findOne({'_id': cardID}).exec()
			.then(function (cards) {
				var taskData = {
					'_id': mongoose.Types.ObjectId(),
					'content': "",
					'startDate': new Date().getTime(),
					'endDate': new Date().getTime(),
					'order' : 0,
					'isDone': false,
					'isActive': false
				};
				cards.tasks.push(taskData);
				return cards.save()
					.then(function (taskAfterSave) {
						res.json({
							"err": false,
							"msg": "Tasks Create",
							"Status": "OK",
							"data": taskAfterSave.tasks.pop(taskAfterSave.tasks.length - 1)
						});
					})
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	},

	update: function (req, res) {
		var cardID = req.body.cid;
		var taskID = req.body.tid;
		var data = {
				'tasks.$.content' : req.body.content,
				'tasks.$.startDate': req.body.startDate,
				'tasks.$.endDate':  req.body.endDate,
				'tasks.$.isDone': req.body.isDone,
				'tasks.$.isActive': req.body.isActive
		};

		Cards.update({'tasks._id':mongoose.Types.ObjectId(taskID)},{$set: data}).exec()
			.then(function () {
				res.json({
					err: false,
					"msg": "Tasks Update",
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
		var cardID = req.body.cid;
		var taskID = req.body.tid;
		var data = {
		  'tasks.$.order' : req.body.order
		};

		Cards.update({'tasks._id':mongoose.Types.ObjectId(taskID)},{$set: data}).exec()
		.then(function () {
		  res.json({
			err: false,
			"msg": "Task Order Update",
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
		var taskID = req.body.tid;

		Cards.update({'tasks._id':mongoose.Types.ObjectId(taskID)},{$pull: {"tasks": {"_id":mongoose.Types.ObjectId(taskID)}}}).exec()

			.then(function () {
				res.json({
					err: false,
					msg: "Tasks Delete Done!",
					status: "OK"
				});
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			})
	}
};