(function() {
  'use strict';

  angular
    .module('app.register')
    .controller('Register', Register);

    Register.$inject = ['Authenticator', '$state'];

    function Register(Authenticator, $state) {
      var vm = this;

      vm.createUser = function() {
        var user = {
          email: vm.email,
          password: vm.password
        };

        Authenticator.createUser(user)
          .then(function(userData) {
            $state.go('games');
            console.log('Success:', userData);
          }, function(reason) {
            console.log('Failed:', reason);
        });
      }

    }
})();