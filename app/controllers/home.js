
var User = mongoose.model('User');

module.exports = {
	index: function (req, res) {
		var cookieToken = req.cookies['token'];

		User.findOne({'tokens': cookieToken}).exec()

			.then(function (user) {
				if(user){
					res.json({
						"err":false,
						"msg":"Already Logged",
						"status":"OK",
						"username":user.uname
					});
				}else{
					res.json({
						"err":true,
						"msg":"User Logged out",
						"status":"BAD"
					});
				}
			})
			.then(null, function (err) {
				res.json({
					err: true,
					msg: err.name + " " + err.message
				});
			});
	}
};