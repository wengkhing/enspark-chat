(function() {
  
  var chatCtrl = function ($scope, profileService, chatService) {
    var vm = this;
    var socket = io.connect();
    $scope.bubbles = [];
    $scope.chat = {
      from: "",
      room: "",
      message: ""
    };

    function init() {
      getUsername();
      getChatHistory();
    }

    init();

    function getUsername() {
      profileService.getProfile()
      .success(function(data) {
        $scope.from = data.name;
      }).error(function (e) {
        console.log(e);
      });
    }

    function getChatHistory() {
      chatService.getLatest()
      .success(function(data) {
        console.log(data);
        $scope.bubbles = data;
      }).error(function (e) {
        console.log(e);
      });
    }

    $scope.send = function() {

      $scope.chat.message = $scope.message;
      $scope.chat.from = $scope.from;

      chatService.send($scope.chat)
      .error(function (e){
        console.log(e);
      });

      // socket.emit('to-server:message', {
      //   from: $scope.user,
      //   message: $scope.message
      // });
      $scope.message = "";
    };

    socket.on('to-client:message', function (data) {
      console.log(data);
      $scope.$apply(function () {
        $scope.messages.push(data);
      });
    });

  };

  chatCtrl.$inject = ['$scope', 'profileService', 'chatService'];

  angular
  .module('application')
  .controller('chatCtrl', chatCtrl);

})();