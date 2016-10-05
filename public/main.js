(function () {

  var config = function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/view/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/view/register.view.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: '/view/login.view.html',
      controller: 'loginCtrl',
      controllerAs: 'vm'
    })
    .when('/profile', {
      templateUrl: '/view/profile.view.html',
      controller: 'profileCtrl',
      controllerAs: 'vm'
    })
    .when('/chat', {
      templateUrl: '/view/chat.view.html',
      controller: 'chatCtrl',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  };

  var run = function ($rootScope, $location, authService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authService.isLoggedIn()) {
        $location.path('/');
      }
    });
  };
  
  angular
  .module('application')
  .config(['$routeProvider', '$locationProvider', config])
  .run(['$rootScope', '$location', 'authService', run]);

})();