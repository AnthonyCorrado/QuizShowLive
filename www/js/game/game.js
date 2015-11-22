(function() {
  'use strict';

  angular
    .module('app.game')
    .controller('Game', Game);

  function Game() {
    console.log('game init');
  }

})();