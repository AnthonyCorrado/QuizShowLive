(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Login', Login);

    Login.$inject = ['Authenticator', '$state'];

    function Login(Authenticator, $state) {
      var vm = this;

      vm.userLogin = function() {
        var user = {
          email: vm.email,
          password: vm.password
        };
        Authenticator.login(user)
          .then(function(userData) {
            $state.go('games');
            console.log('Success:', userData);
          }, function(reason) {
            console.log('Failed:', reason);
        });
      }
    }
})();