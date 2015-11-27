(function() {
  'use strict';

  angular
  .module('app.layout')
  .controller('Topnav', Topnav);

  Topnav.$inject = ['Authenticator', '$state']

  function Topnav(Authenticator, $state) {
    var vm = this;

    vm.logout = function() {
      Authenticator.logout();
      $state.go('login');
    };

  }  
})();