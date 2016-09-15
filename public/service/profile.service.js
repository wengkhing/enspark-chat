(function() {

  function profileService ($http, authService) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authService.getToken()
        }
      });
    };

    return {
      getProfile : getProfile
    };
  }

  profileService.$inject = ['$http', 'authService'];

  angular
  .module('application')
  .service('profileService', profileService);  

})();