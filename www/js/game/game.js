(function() {
  'use strict';

  angular
    .module('app.game')
    .controller('Game', Game);

  function Game() {   
    var vm = this;

    vm.categoryNames = ['Science', 'Sports', 'History', 'Geography', 'Entertainment']
    vm.pointValues = [200, 400, 600, 800]
  }

})();