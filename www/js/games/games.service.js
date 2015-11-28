(function() {
    'use strict';

  angular
    .module('app.games')
    .factory('GamesService', GamesService);

    GamesService.$inject = ['$q', '$firebaseObject', 'lodash'];

    function GamesService($q, $firebaseObject, lodash) {
      var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games');
      var categoriesRef = new Firebase('https://quizshowlive.firebaseio.com/categories');

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
          setupNewGame: setupNewGame,
          generateCategories: generateCategories,
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

      function setupNewGame() {
        gamesRef.push({
          timestamp: Firebase.ServerValue.TIMESTAMP,
          openEnrollment: true,
          categories: categories,
          players: []
        })
        return 'kittens';
      };

      function generateCategories() {
        return getAllCatKeys()
          .then(function(keys) {
            console.log(selectRandomCats(keys));
          })
      }

      function getLastGame() {
        var deferred = $q.defer();
        gamesRef.orderByValue().limitToLast(1).once('value', function(gamesSnapshot) {
          var lastGame = gamesSnapshot.val();
          var gameId = Object.keys(lastGame);
          deferred.resolve(lastGame[gameId]);
        });
        return deferred.promise;
      }

      /* 
       * private methods
      */

      function getAllCatKeys() {
        var deferred = $q.defer();
        var catKeys = [];
        categoriesRef.once('value', function(categoriesSnapshot) {
          categoriesSnapshot.forEach(function(category) {
            var key = category.key();
            catKeys.push(key)
          })
          deferred.resolve(catKeys);
        });
        return deferred.promise;
      }

      function selectRandomCats(keys) {
        var catLimit = 5; // set amount of selected categories for a game
        var totalCategories = keys.length - 1;
        var selectedCats = [];
        var uniqueCats = [];

        while (uniqueCats.length < catLimit) {
          var randomNum = lodash.random(totalCategories);
          selectedCats.push(keys[randomNum]);
          uniqueCats = lodash.uniq(selectedCats) 
        }
        return uniqueCats;
      }

    }
})();