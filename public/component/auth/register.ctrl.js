(function () {
  
  var registerCtrl = function ($location, authService) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authService
      .register(vm.credentials)
      .error(function (err) {
        alert(err);
      }).then(function () {
        $location.path('profile');
      });
    };

  };

  registerCtrl.$inject = ['$location', 'authService'];

  angular
  .module('application')
  .controller('registerCtrl', registerCtrl);

})();