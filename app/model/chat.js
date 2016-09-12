var mongoose = require('mongoose');

// define model ==============================================
module.exports = mongoose.model('Chat', {
  from: Schema.Types.ObjectId,
  to: Schema.Types.ObjectId,
  message: String,
  sent: { type: Date, default: Date.now }
});