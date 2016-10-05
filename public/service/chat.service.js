(function() {

  var chatService = function ($http, authService) {

    var getLatest = function () {
      return $http.get('/api/chat/latest', {
        headers: {
          Authorization: 'Bearer '+ authService.getToken()
        }
      });
    };

    var send = function (chat) {

      return $http.post('/api/chat/send', chat);
    };

    return {
      getLatest : getLatest,
      send: send
    };
  };

  chatService.$inject = ['$http', 'authService'];

  angular
  .module('application')
  .service('chatService', chatService);  

})();