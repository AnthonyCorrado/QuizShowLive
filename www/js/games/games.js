(function() {
  'use strict';

  angular
    .module('app.games')
    .controller('Games', Games);

    Games.$inject = ['$scope', '$stateParams', '$state', 'GamesService'];

    function Games($scope, $stateParams, $state, GamesService) {
      var vm = this;

      vm.allGames = GamesService.getAllGames();

      vm.startGame = function() {
        GamesService.createNewGame()
          .then(function(gameId) {
            $state.go('game', {gameId: gameId});
        });
      }
    }
})();