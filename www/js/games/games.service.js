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

      function getGameDetails(gameId) {
        var deferred = $q.defer();
        var gameRef = gamesRef.child(gameId).once('value', function(gameSnapshot) {
          deferred.resolve(gameSnapshot.val());
        });
        return deferred.promise;
      };

      function setupNewGame(playerId) {
        var deferred = $q.defer();
        var gameId;
        generateCategories()
          .then(function(categories) {
            console.log(categories);
            createBaseGame()
              .then(function(newGameId) {
                addPlayer(playerId, newGameId)
                  .then(function(data) {
                    addCategories(categories, newGameId)
                      .then(function(data) {
                        deferred.resolve(newGameId);
                      })
                  })
              })
          })
        return deferred.promise;
      };

      function createBaseGame(categories, playerId) {
        var deferred = $q.defer();
        var gameData = gamesRef.push({
          timestamp: Firebase.ServerValue.TIMESTAMP,
          openEnrollment: true
        }, function(error) {
          if (error) {
            console.log('An error pushing to Firebase:', error);
            deferred.reject(error);
          } else {
            console.log('saved successfully');
            deferred.resolve(gameData.key());
          }
        });
        return deferred.promise;

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
        var deferred = $q.defer();
        UsersService.getUser(playerId)
          .then(function(playerObj) {
            playerObj.score = 0;
            playerObj.playerId = playerId;
            if (gameId) {
              gamesRef.child(gameId).child('players')
                .push(playerObj, function(error) {
                  if (error) {
                    console.log("There is an error with adding player:", error)
                  } else {
                    console.log('no errors!!!');
                    deferred.resolve('success');
                  }
                })
            } else { // fetches last most recently created lobby if id not known/passed in
              console.log('the ELSE was passed in')
              _this.getLastGame('uid')
                .then(function(lastGameId) {
                  var lastGameId = lastGameId[0];
                  gamesRef.child(lastGameId).child('players').push(playerObj)
                  gamesRef.child(lastGameId).child('players').once('value', function(snapshot) {
                    var numOfPlayers = Object.keys(snapshot.val()).length;
                    if (numOfPlayers > 3) {
                      gamesRef.child(lastGameId).update({ openEnrollment: false });
                    }
                    deferred.resolve(lastGameId);
                  })
                });
            }
          });
        return deferred.promise;
      }

      function addCategories(categories, gameId) {
        var _this = this;
        var deferred = $q.defer();
        categories.forEach(function(category) {
          gamesRef.child(gameId).child('categories')
            .push(category, function(error) {
              if (error) {
                  console.log("There is an error with adding categories:", error)
                } else {
                  console.log('no errors here either  !!!');
                  deferred.resolve('success');
                }
            })
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