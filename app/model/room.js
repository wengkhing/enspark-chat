var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define model ==============================================
module.exports = mongoose.model('Room', {
  users: [ Schema.Types.ObjectId ],
  name: String,
  created: { type: Date, default: Date.now }
});