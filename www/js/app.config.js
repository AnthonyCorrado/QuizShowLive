(function() {
  'use strict';

  angular
  .module('app')
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      console.log('run was...run');
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

    $urlRouterProvider.otherwise('/');

    $stateProvider

      .state('game', {
        url: '/game',
        templateUrl: 'js/game/game.html',
        controller: 'Game',
        controllerAs: 'vm'
      })     

  });
})();