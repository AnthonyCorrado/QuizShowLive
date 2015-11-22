(function() {
  'use strict';

  angular
    .module('app.game')
    .controller('Game', Game);

  function Game() {   
    var vm = this;

    // temp mock players
    vm.players = [
      {
        name: 'Anthony', score: 1000
      },
      {
        name: 'Chip', score: 600
      },
      {
        name: 'Sally', score: 0
      },
      {
        name: 'Marsha', score: 2500
      }
    ];
    vm.categoryNames = ['Science', 'Sports', 'History', 'Geography', 'Entertainment'];
    vm.pointValues = [200, 400, 600, 800];
  }

})();