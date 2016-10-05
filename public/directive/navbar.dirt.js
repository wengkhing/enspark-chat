(function () {

  function navbar () {
    return {
      restrict: 'EA',
      templateUrl: '/tpl/navbar.tpl.html',
      controller: 'navbarCtrl as navvm'
    };
  }

  angular
  .module('application')
  .directive('navbar', navbar);

})();