
var User = mongoose.model('User');
var sha512 = require('js-sha512').sha512;
var randomToken = require('rand-token');

module.exports = {
	remove: function (req, res) {
		var id = req.body.id;

		User.remove({_id: id}).exec()
			.then(function (userAfterRemove){
				res.json({
					err	: false,
					msg	:	"Delete Done !"
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
