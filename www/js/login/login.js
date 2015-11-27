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
      Authenticator.firebaseAuth().$authWithPassword(user)
        .then(function(auth) {
          console.log(auth);
          $state.go('games');
        }, function(error) {
          vm.error = error.code;
          console.log(error);
      });
      console.log(vm.userForm.$valid);
    }
  }
  
})();