// Seeding database with lorem data

var User = require('./model/user');

User.find(function (err, users) {
  if (users.length > 0) {
    console.log('server: Database already seeded.');
  } else {
    console.log("server: Seeding database..");
    var userData = [{
      username: "johnbaker",
      password: 'password'
    }, {
      username: "wixlxiw",
      password: "password"
    }, {
      username: "dineshzy",
      password: "password"
    }, {
      username: "shovel-paladin",
      password: "password"
    }, {
      username: "cherylgck",
      password: "password"
    }, {
      username: "lunagirl79",
      password: "password"
    }];

    for (var i = 0; i < userData.length; i++) {
      var newUser = new User(userData[i]);

      User.create(userData[i], function(err, saved) {
        if (err) {
          console.log("mongodb: CREATE ROW ERROR");
          console.log("=============================================");
          console.log(err);
          console.log("=============================================");
        }
        console.log("mongodb: Create user success: " + saved.username);
      });
      
    }
  }
});
