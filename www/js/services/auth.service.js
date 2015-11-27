(function() {
    'use strict';

  angular
    .module('app.services')
    .factory('Authenticator', Authenticator);

    Authenticator.$inject = ['$firebaseAuth'];

    function Authenticator($firebaseAuth) {
        
      var service = {
          firebaseAuth: firebaseAuth,
      };
      return service;

      function firebaseAuth() {
        var ref = new Firebase('https://quizshowlive.firebaseio.com');
        return $firebaseAuth(ref);  
      };

    }
})();