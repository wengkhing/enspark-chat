(function () {

  var loginCtrl = function ($location, authService) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authService
      .login(vm.credentials)
      .error(function(err){
        alert(err);
      })
      .then(function(){
        $location.path('profile');
      });
    };
  };

  loginCtrl.$inject = ['$location', 'authService'];

  angular
  .module('meanApp')
  .controller('loginCtrl', loginCtrl);

})();