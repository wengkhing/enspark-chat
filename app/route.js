var Chat = require('./model/chat');
var Room = require('./model/room');
var User = require('./model/user');

module.exports = function(app) {

  // send front end application to client on * access -------------------
  app.get('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile('./public/index.html');
  });

  // Get message from a room
  app.get('/api/message/:room_id', function (req, res) {
    // use mongoose to get all todos in the database
    Chat.find(function (err, msg) {
      room: req.params.room_id
      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will exec
      if (err)
        res.send(err)

      // return all todos in json format
      res.json(msg);
    });
  });

};