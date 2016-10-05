var mongoose = require('mongoose');
var Chat = mongoose.model('Chat');

module.exports = function(server) {
  var io = require('socket.io').listen(server);

  io.on('connection', function (socket) {
    console.log('A user connected.');

    socket.on('disconnect', function(){
      console.log('A user disconnected.');
    });

    socket.on('to-server:message', function(data){
      var chat = new Chat();

      chat.from = data.from;
      chat.room = "general";
      chat.message = data.message;

      console.log("=====================================");
      console.log(data);

      chat.save(function(err){
        io.emit('to-client:message', chat);
      });
      
    });

  });
};