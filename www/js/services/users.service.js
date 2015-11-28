(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('UsersService', UsersService);

    UsersService.$inject = ['$firebaseAuth', '$q', '$rootScope'];

    function UsersService($firebaseAuth, $q, $rootScope) {
      var ref = new Firebase('https://quizshowlive.firebaseio.com');
      var usersRef = ref.child('users');
        
      var service = {
        getUser: getUser
      };
      return service;

      function getUser(userId) {
        var deferred = $q.defer();
        usersRef.child(userId).once('value', function(userSnapshot) {
          deferred.resolve(userSnapshot.val());
        }, function(error) {
          console.log('error:', error);
          deferred.reject(error);
        });
        return deferred.promise;
      }
    }
})();