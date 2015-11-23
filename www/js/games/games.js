(function() {
  'use strict';

  angular
    .module('app.games')
    .controller('Games', Games);

    Games.$inject = ['$scope', '$stateParams', 'GamesService'];

    function Games($scope, $stateParams, GamesService) {
      var vm = this;

      // temp mock games
      vm.games = [
        {
          id: 1,
          players: [
            23, 12, 11, 4
          ]
        },
        {
          id: 2,
          players: [
            2, 10, 31, 9
          ]
        }
      ]
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