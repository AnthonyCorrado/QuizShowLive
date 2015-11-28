(function() {
    'use strict';

  angular
    .module('app.games')
    .factory('GamesService', GamesService);

    GamesService.$inject = ['$q', '$timeout', '$firebaseObject'];

    function GamesService($q, $timeout, $firebaseObject) {
      var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games');

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
          createNewGame: createNewGame,
          getLastGame: getLastGame
      };
      return service;

      function getAllGames() {
        // gamesRef.push(data);
        return $firebaseObject(gamesRef);
      };

      function getGameDetails (gameId) {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games' + '/' + gameId);
        console.log('gameService', gameId);
        return $firebaseObject(gamesRef)
      };

      function createNewGame() {
        gamesRef.once('value', function(gamesSnapshot) {
          var games = gamesSnapshot.val();
          console.log(games);
        })
        // var deferred = $q.defer();
        // deferred.resolve(gameId);
        // return deferred.promise;
      };

      function getLastGame() {
        var deferred = $q.defer();
        gamesRef.orderByValue().limitToLast(1).once('value', function(gamesSnapshot) {
          var lastGame = gamesSnapshot.val();
          var gameId = Object.keys(lastGame);
          deferred.resolve(lastGame[gameId]);
        });
        return deferred.promise;
      }
    }
})();