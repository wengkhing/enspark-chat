(function () {

  function navbar () {
    return {
      restrict: 'EA',
      templateUrl: '/directive/navbar.tpl.html',
      controller: 'navbarCtrl as navvm'
    };
  }

  angular
  .module('application')
  .directive('navbar', navbar);

})();