(function() {
  'use strict';

  angular
    .module('app.games')
    .controller('Game', Game);

    Game.$inject = ['$scope', '$stateParams', 'GamesService'];

    function Game($scope, $stateParams, GamesService) {
      var vm = this;
      var gameId = $stateParams.gameId;

      vm.game = GamesService.getGameDetails(gameId);
      vm.players = vm.game;
      vm.categoryNames = ['Science', 'Sports', 'History', 'Geography', 'Entertainment'];
      vm.pointValues = [200, 400, 600, 800];

      console.log(gameId);
    }
})();