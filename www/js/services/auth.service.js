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
          login: login,
          logout: logout,
          createUser: createUser
      };
      return service;

      function firebaseAuth() {
        return $firebaseAuth(ref);  
      };

      function login(user) {
        var deferred = $q.defer();
        ref.authWithPassword(user, function(error, authData) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve(authData);
          }
        });
        return deferred.promise;
      }

      function logout() {
        return this.firebaseAuth().$unauth();
      }

      function createUser(user) {
        var deferred = $q.defer();
        ref.createUser(user, function(error, userData) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve(userData);
          }
        });
        return deferred.promise;
      }

    }
})();