(function() {
    'use strict';

  angular
    .module('app.services')
    .factory('Authenticator', Authenticator);

    Authenticator.$inject = ['$firebaseAuth', '$q', '$rootScope'];

    function Authenticator($firebaseAuth, $q, $rootScope) {
      var ref = new Firebase('https://quizshowlive.firebaseio.com');
        
      var service = {
          firebaseAuth: firebaseAuth,
          login: login,
          logout: logout,
          createUser: createUser,
          userSession: userSession,
          sessionChange: sessionChange
          
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
            ref.child('users').child(userData.uid).set({
              name: user.username
            })
            deferred.resolve(userData);
          }
        });
        return deferred.promise;
      }

      function userSession() {
        return ref.getAuth()
      }

      function sessionChange() {
        return ref.onAuth(authDataCallback)
      }

      function authDataCallback(authData) {
        // transmits auth data or null. Received by topnav controller
        $rootScope.$broadcast('sessionChange', {
          authData: authData
        });
       return authData;
      }
    }
})();