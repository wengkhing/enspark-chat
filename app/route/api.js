var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlChat = require('../controller/chat');
var ctrlProfile = require('../controller/profile');
var ctrlAuth = require('../controller/authentication');

// chat
router.get('/chat/latest', auth, ctrlChat.latestHistory);
router.post('/chat/send', ctrlChat.sendMessage);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
