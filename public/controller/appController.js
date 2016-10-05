(function () {
  var appCtrl = function (
    $scope
  ) {
    // var socket = io.connect();
    // $scope.messages = [];

    // $scope.send = function() {
    //   socket.emit('to-server:message', {
    //     user: $scope.user,
    //     msg: $scope.message
    //   });
    //   $scope.message = "";
    // };

    // socket.on('to-client:message', function (data) {
    //   console.log(data);
    //   $scope.$apply(function () {
    //     $scope.messages.push(data);
    //   });
      
    // });

    function init() {
      
      
    }

    init();
  };

  appCtrl.$inject = [
    '$scope'
  ];

  angular
  .module('application')
  .controller('appCtrl', appCtrl);
})();
