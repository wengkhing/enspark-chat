var express = require('express');
var app = express();
var http = require('http');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res) {
  res.sendfile('index.html', { root: __dirname+'/public' });
});

var id = 0;

io.sockets.on('connection', function (socket) {
  console.log('A user connected.');

  socket.on('disconnect', function(){
    console.log('A user disconnected.');
  });

  socket.on('to-server:message', function(data){
    console.log(data.user + ' said: "' + data.msg + '" at ' + new Date().getTime());
    io.emit('to-client:message', {
      id: id,
      user: data.user,
      msg: data.msg,
      time: new Date().getTime()
    });
    id = id + 1;
  });
});

server.listen(3000, function(){
  console.log('Express server listening on port 3000');
});