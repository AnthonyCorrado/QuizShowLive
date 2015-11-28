(function() {
  'use strict';

  angular
    .module('app.games')
    .controller('Games', Games);

    Games.$inject = ['$scope', '$stateParams', '$state', 'GamesService', 'Authenticator'];

    function Games($scope, $stateParams, $state, GamesService, Authenticator) {
      var vm = this;
      var sessionData = Authenticator.userSession();
      var userId = sessionData.uid;
      console.log(userId);

      vm.allGames = GamesService.getAllGames();

      vm.joinGame = function() {
        $state.go('lobby', { userId: userId } );
        // GamesService.createNewGame()
        //   .then(function(gameId) {
        //     $state.go('game', {gameId: gameId});
        // });
      }
    }
})();