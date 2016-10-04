var Chat = require('./model/chat');
var Room = require('./model/room');
var User = require('./model/user');

module.exports = function(app) {

  // send front end application to client on * access -------------------
  app.get('*', function(req, res) {
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile('./public/index.html');
  });

};