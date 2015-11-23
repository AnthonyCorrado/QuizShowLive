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
          '3249dfj_fda12k': 'Chip',
          '9039434uoj300n': 'Sally',
          '9d_erjk023hfkf': 'Gertrud'
        },
        "timestamp": Firebase.ServerValue.TIMESTAMP
      };
        
      var service = {
          getAllGames: getAllGames
      };
      return service;

      function getAllGames() {
        var gamesRef = new Firebase('https://quizshowlive.firebaseio.com/games');
        // gamesRef.push(data);
        return $firebaseObject(gamesRef);
      };
    }
})();