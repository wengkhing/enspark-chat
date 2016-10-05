var mongoose = require('mongoose');

// define model ==============================================

var chatSchema = new mongoose.Schema({
  from: { 
    type: String, 
    required: true 
  },
  room: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  sent: { 
    type: Date, 
    default: Date.now 
  }
});

mongoose.model('Chat', chatSchema);