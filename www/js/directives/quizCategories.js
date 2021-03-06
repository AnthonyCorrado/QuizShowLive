(function() {
    'use strict';

    angular
        .module('app.directives')
        .directive('quizCategories', quizCategories);

    /* @ngInject */
    function quizCategories () {
      
      var directive = {
        scope: {
          categoryNames: '=',
          pointValues: '=' 
        },
        link: function (scope, element, attrs) {
        },
        restrict: 'A',
        templateUrl: 'js/categories/categories.html'
      };
      return directive;
    }

})();