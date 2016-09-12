var mongoose = require('mongoose');

// define model ==============================================
module.exports = mongoose.model('User', {
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
  created: { type: Date, default: Date.now }
});