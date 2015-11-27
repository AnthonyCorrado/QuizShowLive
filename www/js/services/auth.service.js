(function() {
    'use strict';

  angular
    .module('app.services')
    .factory('Authenticator', Authenticator);

    Authenticator.$inject = ['$firebaseAuth', '$q'];

    function Authenticator($firebaseAuth, $q) {
      var ref = new Firebase('https://quizshowlive.firebaseio.com'); 
        
      var service = {
          firebaseAuth: firebaseAuth,
          logout: logout,
          createUser: createUser
      };
      return service;

      function firebaseAuth() {
        return $firebaseAuth(ref);  
      };

      function logout() {
        return this.firebaseAuth().$unauth();
      }

      function createUser(user) {
        var deferred = $q.defer();
        ref.createUser(user, function(error, userData) {
          if (error) {
            deferred.reject(error);
            console.log(error);
          } else {
            deferred.resolve(userData);
            console.log(userData);
          }
        });
        return deferred.promise;
      }

    }
})();