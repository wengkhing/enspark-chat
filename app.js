// Setup ==================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');                   // log requests to the console (express4)
var bodyParser = require('body-parser');          // pull information from HTML POST (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var database = require('./config/database');
var port = process.env.PORT || 2016;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Database configuration ============================================
mongoose.connect(database.url);

// App configuration ============================================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes ====================================================
require('./app/route')(app);

// Seed fake data database =============================================
require('./app/seed');

// Socket configuration =========================================================
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

// Server listen to port number ====================================================
server.listen(port, function(){
  console.log('========================');
  console.log('      ENSPARK CHAT      ');
  console.log('========================');
  console.log('server: Initalizing Enspark Chat..');
  console.log('server: Magic is now happening at port ' + port + '...');
});