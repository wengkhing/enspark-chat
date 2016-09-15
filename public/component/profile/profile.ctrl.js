(function() {
  
  
  function profileCtrl($location, profileService) {
    var vm = this;

    vm.user = {};

    profileService.getProfile()
    .success(function(data) {
      vm.user = data;
    })
    .error(function (e) {
      console.log(e);
    });
  }

  angular
  .module('application')
  .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'profileService'];

})();