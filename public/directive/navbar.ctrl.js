(function () {

  
  function navbarCtrl(
    $location,
    authService
  ) {
    var vm = this;

    vm.isLoggedIn = authService.isLoggedIn();

    vm.currentUser = authService.currentUser();

  }

  navbarCtrl.$inject = [
    '$location',
    'authService'
  ];

  angular
  .module('application')
  .controller('navbarCtrl', navbarCtrl);

})();