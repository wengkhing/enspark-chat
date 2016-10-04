(function() {
  
  var chatCtrl = function ($scope, profileService) {
    var vm = this;
    var socket = io.connect();

    function init() {
      getUsername();
      getChatHistory();
    }

    init();

    function getUsername() {
      profileService.getProfile()
      .success(function(data) {
        $scope.user = data.name;
      })
      .error(function (e) {
        console.log(e);
      });
    }

    function getChatHistory() {

    }

    $scope.send = function() {
      socket.emit('to-server:message', {
        user: $scope.user,
        msg: $scope.message
      });
      $scope.message = "";
    };

    socket.on('to-client:message', function (data) {
      console.log(data);
      $scope.$apply(function () {
        $scope.messages.push(data);
      });
    });

  };

  chatCtrl.$inject = ['$scope', 'profileService'];

  angular
  .module('application')
  .controller('chatCtrl', chatCtrl);

})();