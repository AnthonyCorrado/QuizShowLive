(function() {
  'use strict';

  angular
  .module('app')
  .run(function($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        console.log('error in auth');
        // $state.go('login');
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('register', {
        url: '/register',
        templateUrl: 'js/register/register.html',
        controller: 'Register',
        controllerAs: 'vm'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'Login',
        controllerAs: 'vm',
        resolve: {
          requireNoAuth: function($state, Authenticator) {
            return Authenticator.firebaseAuth().$requireAuth()
              .then(function(auth){
                console.log(auth);
                $state.go('games');
              }, function(error){
                return;
            });
          }
        }
      })

      .state('games', {
        url: '/games',
        templateUrl: 'js/games/games.html',
        controller: 'Games',
        controllerAs: 'vm',
        resolve: {
          currentAuth: function(Authenticator) {
             console.log(Authenticator.firebaseAuth().$requireAuth());
            return Authenticator.firebaseAuth().$requireAuth();
          }
        }
      })  

      .state('game', {
        url: '/games/:gameId',
        templateUrl: 'js/games/game.html',
        controller: 'Game',
        controllerAs: 'vm'
      })


    $urlRouterProvider.otherwise('/');
 
  });
})();