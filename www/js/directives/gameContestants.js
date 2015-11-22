(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('gameContestants', gameContestants);

    /* @ngInject */
    function gameContestants () {
      
      var directive = {
        scope: {
          playerNames: '='
        },
        link: function (scope, element, attrs) {
        },
        restrict: 'A',
        templateUrl: 'js/contestants/contestants.html'
      };
      return directive;
    }

})();