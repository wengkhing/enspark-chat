(function () {

  var authService = function ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['enspark-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['enspark-token'];
    };

    var logout = function() {
      $window.localStorage.removeItem('enspark-token');
    };

    var isLoggedIn = function() {
      // Token example: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWQ0MjNjMTUxMzcxMmNkMzE3YTRkYTciLCJlbWFpbCI6InNpbW9uQGZ1bGxzdGFja3RyYWluaW5nLmNvbSIsIm5hbWUiOiJTaW1vbiBIb2xtZXMiLCJleHAiOjE0NDA1NzA5NDUsImlhdCI6MTQzOTk2NjE0NX0.jS50GlmolxLoKrA_24LDKaW3vNaY94Y9EqYAFvsTiLg

      // A JWT is actually made up of three separate strings, separated by a dot .. These three parts are:

      // 1. Header – An encoded JSON object containing the type and the hashing algorithm used
      // 2. Payload – An encoded JSON object containing the data, the real body of the token
      // 3. Signature – An encrypted hash of the header and payload, using the “secret” set on the server

      var token = getToken();
      var payload;

      if(token){
        // Get the 2nd section - payload
        payload = token.split('.')[1];
        // Decode Base64 string
        payload = $window.atob(payload);
        // JSON'fy the string object
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    var register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    var login = function(user) {
      return $http.post('/api/login', user).success(function(data) {
        saveToken(data.token);
      });
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  };

  authService.$inject = [
    '$http', 
    '$window'
  ];

  angular
  .module('application')
  .service('authService', authService);

})();