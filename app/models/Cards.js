
var Schema = mongoose.Schema;

var CardsSchema = new Schema({
	_bid: {type: String},
	_uid: {type: String},
	title: {type: String},
	tasks: {type: Array, default: []},
	createdDate: {type: Date, default: Date.now},
	order: {type: Number, default: 0},
	isActive: {type: Boolean, default: false}
});

mongoose.model('Cards', CardsSchema);

module.exports = CardsSchema;