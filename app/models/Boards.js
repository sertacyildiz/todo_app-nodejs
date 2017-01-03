
var Schema = mongoose.Schema;

var BoardsSchema = new Schema({
	_uid				:		{type: String},
	title				:		{type: String},
	createdDate :		{type: Date, default: Date.now},
	order				:		{type: Number, default: 0},
	isActive		:		{type: Boolean, default: false}
});

mongoose.model('Boards', BoardsSchema);

module.exports = BoardsSchema;