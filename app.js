// Setup ==================================================
var express = require('express');
var path = require('path');
var morgan = require('morgan');                   // log requests to the console (express4)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');          // pull information from HTML POST (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var port = process.env.PORT || 2016;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var passport = require('passport');

// Database configuration ============================================
var database = require('./app/config/database');
mongoose.connect(database.url);

// [SH] Bring in the data model
require('./app/model/db');
// [SH] Bring in the Passport config after model is defined
require('./app/config/passport');

// App configuration ============================================
var app = express();

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());
// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// Routes ====================================================
require('./app/route')(app);

// Seed fake data database =============================================
require('./app/seed');

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"server" : err.name + ": " + err.message});
  }
});

// Socket configuration =========================================================
io.sockets.on('connection', function (socket) {
  console.log('A user connected.');

  socket.on('disconnect', function(){
    console.log('A user disconnected.');
  });

  socket.on('to-server:message', function(data){
    console.log(data.user + ' said: "' + data.msg + '" at ' + new Date().getTime());
    io.emit('to-client:message', {
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