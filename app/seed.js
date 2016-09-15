// Seeding database with lorem data

var mongoose = require('mongoose');
var User = mongoose.model('User');
var ctrlAuth = require('../controller/authentication');

User.find(function (err, users) {
  if (users.length > 0) {
    console.log('server: Database already seeded.');
  } else {
    console.log("server: Seeding database..");
    var userData = [{
      email: "johnbaker@mail.com",
      name: 'John Baker'
    }, {
      email: "wixlxiw@mail.com",
      name: "Willie Xis"
    }, {
      email: "dineshzy@mail.com",
      name: "Dinesh ZY"
    }, {
      email: "shovel-paladin@mail.com",
      name: "Shovel Paladin"
    }, {
      email: "cherylgck@mail.com",
      name: "Cheryl Goh"
    }, {
      email: "lunagirl79@mail.com",
      name: "Kristy Hadfield"
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
