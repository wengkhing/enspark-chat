// (function () {
//   var appSocket = function (
//     $rootScope
//   ) {
//     var socket = io.connect();
//     var factory = {};

//     factory.sendMessage = function(msg) {
//       return socket.emit('to-server:message', {
//         msg: msg
//       });
//     };

//     socket.on('to-client:message', function (data) {
//       $rootScope.$emit = ('updateChat', data);
//       console.log(data.msg);
//     });

//     return factory;
//   };

//   appSocket.$inject = [
//     '$rootScope'
//   ];

//   angular
//   .module('application')
//   .factory('appSocket', appSocket);
// })();
