(function() {
  'use strict';

  angular
    .module('app.games')
    .controller('Game', Game);

    Game.$inject = ['$scope', '$stateParams', 'GamesService'];

    function Game($scope, $stateParams, GamesService) {
      var vm = this;
      var gameId = $stateParams.gameId;
      console.log('gameId', gameId)

      GamesService.getGameDetails(gameId)
        .then(function(gameDetails) {   
          console.log(gameDetails);
          GamesService.getAllGames(gameId).$bindTo($scope, 'vm.gameDetails');
          vm.gameDetails = gameDetails;
          vm.categories = vm.gameDetails.categories;
          vm.players = vm.gameDetails.players
        })
      vm.pointValues = [200, 400, 600, 800];

    }
})();