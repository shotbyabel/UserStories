(function() {
  'use strict';

  angular.module('authService', []);
  .factory('Auth', function($http, $q, AuthToken) {

    var authFactory = {};

    authFactory.login = function(username, password) { //get API from api.post

        return $http.post('/api/login', {
            username: username,
            password: password
          })
          .success(function(data) {
            AuthToken.setToken(data.token);

            return data;

          })

      }
      //logout - clear token
    authFactory.logout = function() {
      AuthToken.setToken();
    }

    //check if user is logged in
    authFactory.isLoggedIN = function() {
      if (AuthToken.getToken())
        return true;

      else
        return false
    }

    //get all user info...
    authFactory.getUser = function() {
      if (AuthToken.getToken())
        return $http.get('/api/me');

      else
        return $q.reject({
          message: "User has no token!"
        });
    }

  })

  /////
})();