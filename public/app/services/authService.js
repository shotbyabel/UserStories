(function() {
    'use strict';

    angular.module('authService', []);
    // A U T H  F A C T O R Y  
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
     ////// 
    ///check if user is logged in
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

      return authFactory;

    })

    // T O K E N   F A C T O R Y    
    .factory('AuthToken', function($window) {

      var authTokenFactory = {}

      //get token from the browser
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');

      }
      //store token
      authTokenFactory.setToken = function(token) {

        if (token)
          $window.localStorage.setItem('token', token);

        else

          $window.localStorage.removeItem('token');
      }

      return authTokenFactory;

    });

/// TOKEN  I N T E R C E P T O R     
  
  .factory('TokenInterceptor', function($q, $location, AuthToken) {

    var tokenInterceptor = {};

    tokenInterceptor.request = function(config) {//request if token exist in localStorage

      var token = AuthToken.getToken();

      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    };
//error checking
  tokenInterceptor.responseError = function(response) {
    if(response.status == 403)
      $location.path('/login');

    return $q.reject(response);
  }


  })






  /////
})();