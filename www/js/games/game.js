(function() {
  'use strict';

  angular
    .module('app.games')
    .controller('Game', Game);

    Game.$inject = ['$scope', '$stateParams', 'GamesService'];

    function Game($scope, $stateParams, GamesService) {
      var vm = this;
      var gameId = $stateParams.gameId;

      GamesService.getGameDetails(gameId)
        .then(function(gameDetails) {     
          console.log(gameDetails);
          vm.gameDetails = gameDetails;
          vm.categories = vm.gameDetails.categories;
          vm.players = vm.gameDetails.players
        })
      vm.pointValues = [200, 400, 600, 800];

      console.log(gameId);
    }
})();