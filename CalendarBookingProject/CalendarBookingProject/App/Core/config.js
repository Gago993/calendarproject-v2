(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configure);

    configure.$inject = ['$routeProvider', '$locationProvider'];

    function configure($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({ enabled: true, requireBase: false });

        // here config the states
        $routeProvider
         .when('/main', {
             templateUrl: 'App/Main/index.html',
             controller: 'MainController',
             controllerAs: 'vm'
         })
         .otherwise({ redirectTo: '/main' });
    }
})();