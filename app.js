// Setup ========================================================================
var express = require('express');
var path = require('path');
var morgan = require('morgan');                   // log requests to the console (express4)
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');          // pull information from HTML POST (express4)
var methodOverride = require('method-override');  // simulate DELETE and PUT (express4)
var port = process.env.PORT || 8080;
// var server = require('http').createServer(app);
var passport = require('passport');

// [SH] Bring in the data model
require('./app/model/db');
// [SH] Bring in the Passport config after model is defined
require('./app/config/passport');



// App configuration ============================================================
var app = express();

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));            
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'dist')));                 // set the static files location /public/img will be /img for users

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());


// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./app/route/api');
// [SH] Use the API routes when path starts with /api
app.use('/api', routesApi);

// [SH] Otherwise render the index.html page for the Angular SPA
// [SH] This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Routes =======================================================================

// Seed fake data database ======================================================
require('./app/seed');

// // [SH] Otherwise render the index.html page for the Angular SPA
// // [SH] This means we don't have to map all of the SPA routes in Express
// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// error handlers ===============================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Server listen to port number ====================================================
var server = app.listen(port, function(){
  console.log('========================');
  console.log('      ENSPARK CHAT      ');
  console.log('========================');
  console.log('server: Initalizing Enspark Chat..');
  console.log('server: Magic is now happening at port ' + port + '...');
});

require('./app/socket')(server);

module.exports = app;