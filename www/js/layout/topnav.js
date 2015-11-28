(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Topnav', Topnav);

  Topnav.$inject = ['Authenticator', '$state', '$scope']

  function Topnav(Authenticator, $state, $scope) {
    var vm = this;
    vm.userSession = Authenticator.userSession();
    Authenticator.sessionHasChanged();

    vm.logout = function() {
      Authenticator.logout();
      $state.go('login');
    };

    // notified anytime auth status changes. Triggered from auth.service
    $scope.$on('sessionHasChanged', function(event, user) {
      vm.userSession = user.authData;
    })

  }  
})();