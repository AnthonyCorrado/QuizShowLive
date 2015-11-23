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
          '39fasflkrwlkjr': 'Anthony',
          '32498sdlj_aio0': 'Michael',
          '9039434uoj300n': 'Sally',
          '9dfgerjk_03432': 'Marsha'
        }
      };
        
      var service = {
          getAllGames: getAllGames
      };
      return service;

      function getAllGames() {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games');
        return $firebaseObject(gamesRef);
        // var deferred = $q.defer();
        // var recognition = new webkitSpeechRecognition();
        // recognition.start();
        // recognition.onresult = function(event) {
        //   console.log(event.results[0][0].transcript);
        //   deferred.resolve(event.results[0][0].transcript);
        // };
        // return deferred.promise;
      };

      // MOCK FIREBASE DATA
        // var playerRef = gamesRef.child('players').set('id_dfasdfk309903')
        // gamesRef.push(data);

    }
})();