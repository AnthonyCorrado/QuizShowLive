(function() {

  angular.module('app', [
    'ionic',

    // third-party
    'firebase',
    'ngAnimate',
    'ngLodash',

    // core app modules
    'app.layout',
    'app.directives',
    'app.services',

    // features
    'app.register',
    'app.login',
    'app.lobby',
    'app.games'

  ])

})();


