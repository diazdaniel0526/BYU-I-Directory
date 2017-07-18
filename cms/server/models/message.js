var mongoose = require('mongoose');
var schema = mongoose.Schema;

var schema = new Schema({
  id: {type: String, require: true},
  subject: {type: String},
  msgText: {type: String, require: true},
  sender: {type: Schema.Types.ObjectId, ref: 'Contact'}
});

module.exports = mongoose.model('Message', schema);
