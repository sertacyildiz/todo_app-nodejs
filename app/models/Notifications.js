
var Schema = mongoose.Schema;

var NotificationsSchema = new Schema({
	_uid				:		{type: String},
	_tid				:		{type: String}
});

mongoose.model('Notifications', NotificationsSchema);

module.exports = NotificationsSchema;