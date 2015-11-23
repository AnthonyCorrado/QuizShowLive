(function() {
    'use strict';

  angular
    .module('app.games')
    .factory('GamesService', GamesService);

    GamesService.$inject = ['$q', '$timeout'];

    function GamesService($q, $timeout) {

      var service = {
          getAllGames: getAllGames
      };
      return service;

      function getAllGames() {
        console.log('getAllGames has been called');
        // var deferred = $q.defer();
        // var recognition = new webkitSpeechRecognition();
        // recognition.start();
        // recognition.onresult = function(event) {
        //   console.log(event.results[0][0].transcript);
        //   deferred.resolve(event.results[0][0].transcript);
        // };
        // return deferred.promise;
      };

    }
})();