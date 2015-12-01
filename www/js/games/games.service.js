(function() {
    'use strict';

  angular
    .module('app.games')
    .factory('GamesService', GamesService);

    GamesService.$inject = ['$q', '$firebaseObject', 'lodash', 'UsersService'];

    function GamesService($q, $firebaseObject, lodash, UsersService) {
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
          getLastGame: getLastGame,
          addPlayer: addPlayer
      };
      return service;

      function getAllGames() {
        return $firebaseObject(gamesRef);
      };

      function getGameDetails (gameId) {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games' + '/' + gameId);
        return $firebaseObject(gamesRef)
      };

      function setupNewGame(playerId) {
        var gameId;
        generateCategories()
          .then(function(categories) {
            var gameId = createBaseGame();
            // save categories to pregame lobby
            addCategories(categories, gameId);
            addPlayer(playerId, gameId);
            // gamesRef.child(gameId).update({
            //   categories: categories
            // })

          })
        return 'kittens';
      };

      function createBaseGame(categories, playerId) {
        var gameData = gamesRef.push({
          timestamp: Firebase.ServerValue.TIMESTAMP,
          openEnrollment: true
        });
        return gameData.key();

      }

      function generateCategories() {
        return getAllCategories()
          .then(function(keys) {
            return selectRandomCats(keys);
          })
      }

      function getLastGame(option) {
        var deferred = $q.defer();
        gamesRef.orderByValue().limitToLast(1).once('value', function(gamesSnapshot) {
          var lastGame = gamesSnapshot.val();
          var gameId = Object.keys(lastGame);
          if (option) {
            deferred.resolve(gameId);
          } else {
            deferred.resolve(lastGame[gameId]);
          }
        });
        return deferred.promise;
      }

      function addPlayer(playerId, gameId) {
        var _this = this;
        UsersService.getUser(playerId)
          .then(function(playerObj) {
            playerObj.playerId = playerId;
            if (gameId) {
              gamesRef.child(gameId).child('players').push(playerObj)
            } else { // fetches last most recently created lobby if id not known/passed in
              _this.getLastGame('uid')
                .then(function(lastGameId) {
                  var lastGameId = lastGameId[0];
                  gamesRef.child(lastGameId).child('players').push(playerObj)
                });
            }
          })
      }

      function addCategories(categories, gameId) {
        var _this = this;
        var deferred = $q.defer();
        categories.forEach(function(category) {
          console.log(category);
          gamesRef.child(gameId).child('categories').push(category)
        })
        return deferred.promise;
      }

      /* 
       * private methods
      */

      function getAllCategories() {
        var deferred = $q.defer();
        var catKeys = [];
        categoriesRef.once('value', function(categoriesSnapshot) {
          categoriesSnapshot.forEach(function(category) {
            var key = category.key();
            var catObj = category.val();
            catObj.categoryId = key;
            catKeys.push(catObj)
          })
          deferred.resolve(catKeys);
        });
        return deferred.promise;
      }

      function selectRandomCats(categories) {
        var catLimit = 5; // set amount of selected categories for a game
        var totalCategories = categories.length - 1;
        var selectedCats = [];
        var uniqueCats = [];

        while (uniqueCats.length < catLimit) {
          var randomNum = lodash.random(totalCategories);
          selectedCats.push(categories[randomNum]);
          uniqueCats = lodash.uniq(selectedCats) 
        }
        return uniqueCats;
      }

    }
})();