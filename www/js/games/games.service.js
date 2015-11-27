(function() {
    'use strict';

  angular
    .module('app.games')
    .factory('GamesService', GamesService);

    GamesService.$inject = ['$q', '$timeout', '$firebaseObject'];

    function GamesService($q, $timeout, $firebaseObject) {

      // temp game setup MOCK DATA
      var data = {
        "players": {
          '39fasflkr12sjr': 'Tony',
          '3249dfj_fda12k': 'Chip',
          '9039434u_sd00n': 'Kelly',
          '9d_erjk023hfkf': 'Gertrud'
        },
        "timestamp": Firebase.ServerValue.TIMESTAMP
      };
        
      var service = {
          getAllGames: getAllGames,
          getGameDetails: getGameDetails,
          createNewGame: createNewGame
      };
      return service;

      function getAllGames() {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games');
        // gamesRef.push(data);
        return $firebaseObject(gamesRef);
      };

      function getGameDetails (gameId) {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games' + '/' + gameId);
        console.log('gameService', gameId);
        return $firebaseObject(gamesRef)
      };

      function createNewGame() {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games');
        deferred.resolve(gameId);
        return deferred.promise;
      }
    }
})();