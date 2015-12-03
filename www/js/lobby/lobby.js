(function() {
  'use strict';

  angular
    .module('app.lobby')
    .controller('Lobby', Lobby);

    Lobby.$inject = ['$scope', '$stateParams', '$state', 'GamesService'];

    function Lobby($scope, $stateParams, $state, GamesService) {
      var vm = this;
      var userId = $stateParams.userId;
      console.log(userId);

      function getLobbyStatus() {
        GamesService.getLastGame()
          .then(function(gameData) {
            if (gameData.openEnrollment) {
              joinExistingLobby()
            } else {
              startNewLobby();
            }
        })
      }

      function joinExistingLobby() {
        console.log('joining existing room');
        GamesService.addPlayer(userId);
      }

      function startNewLobby() {
        GamesService.setupNewGame(userId)
          .then(function(gameId) {
            console.log(gameId);
            $state.go('game', { gameId: gameId})
          })
          // .then(function(keys) {
          //   console.log(keys);
          // })
        // console.log(GamesService.setupNewGame());
        // GamesService.getAllCatKeys()
        //   .then(function(data) {
        //     console.log(data);
        //   })
        console.log('a new lobby is being created');
      }

      getLobbyStatus()
    }
})();