var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');

module.exports.latestHistory = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError"
    });
  } else {
    // Otherwise continue
    Chat
    .find()
    .exec(function(err, chat) {
      console.log("==============================");
      console.log(chat);
      res.status(200).json(chat);
    });
  }

};

module.exports.sendMessage = function(req, res) {

  // If no user ID exists in the JWT return a 401
  // if (!req.payload._id) {
  //   res.status(401).json({
  //     "message" : "UnauthorizedError"
  //   });
  // } else {

    var chat = new Chat();

    chat.from = req.body.from;
    chat.room = "general";
    chat.message = req.body.message;

    console.log("=====================================");
    console.log(req.body);

    chat.save(function(err){
      res.status(200);
    });
  // }

};