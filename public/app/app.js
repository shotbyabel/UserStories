(function() {
  'use strict';

  angular.module('myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
      $stateProvider
        .state('/', {
          url: '/home',
          templateUrl: 'app/views/templates/home.html'
        })

      .state('/link', {
        url: '/link',
        templateUrl: 'app/views/templates/link.html',
        controller: 'MainCtrl'

      })

      .state('/mom', {
        url: '/mom',
        templateUrl: 'app/views/templates/link.html',
        controller: 'MainCtrl'


      });

      $urlRouterProvider.otherwise('/');


    }]);


})();