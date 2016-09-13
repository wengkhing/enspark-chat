var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define model ==============================================
module.exports = mongoose.model('Chat', {
  from: { type: Schema.Types.ObjectId, required: true },
  room: { type: Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  sent: { type: Date, default: Date.now }
});

