(function() {
  'use strict';

  angular.module('mainCtrl', [])
    .controller('MainController',
      function($rootScope, $location, AuthFactory) {

        var vm = this;

        vm.loggedIn = AuthFactory.isLogged();

        $rootScope.$on('$routeChangeStart', function() {

          vm.loggedIn = AuthFactory.isLoggedIN();

          AuthFactory.getUser()
            .then(function(data) {
              vm.user = data.data;
            }); //
        });
        
//L O G I N 
        vm.doLogin = function() {

          vm.processing = true;

          vm.error = '';

          AuthFactory.login(vm.loginData.username, vm.loginData.password)
            .success(function(data) {
              vm.processing = false;

              AuthFactory.getUser()
                .then(function(data) {
                  vm.user = data.data;
                });

              if (data.success)
                $location.path('/');
              else
                vm.error = data.message
            });
        }

//L O G O U T 
        vm.doLogout = function() {
          AuthFactory.logout();
          $location.path('/logout');

        }


      }); //.controller close
})(); //IIFE END