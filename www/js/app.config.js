(function() {
  'use strict';

  angular
  .module('app')
  .run(function($ionicPlatform) {
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
  })
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('games', {
        url: '/games',
        templateUrl: 'js/games/games.html',
        controller: 'Games',
        controllerAs: 'vm'
      })  

      .state('game', {
        url: "/games/:gameId",
        templateUrl: "js/games/game.html",
        controller: 'Game',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('/games');

      // .state('games.detail', {
      //   url: 'games/:gameId',
      //   templateUrl: 'js/games/game.html'
      // });  
  });
})();