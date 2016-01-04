angular.module('services', [])
  .service('AuthService', function($q, $http, API_ENDPOINT){
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;
  
    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }
  
    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }
  
    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;
      
      $http.defaults.headers.common.Authorization = authToken;
    }
  
    var login = function(user) {
      return $q(function(resolve, reject){
        $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result){
          if(result.data.success){
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          }else{
            reject(result.data.msg);
          }
        });
      });
    };
  
    var register = function(user) {
      return $q(function(resolve, reject){
        $http.post(API_ENDPOINT.url + '/signup', user).then(function(result){
          if (result.data.success){
            resolve(result.data.msg);
          }else{
            reject(result.data.msg);
          }
        })
      })
    }
    
    var customers = function(){      
      return $q(function(resolve, reject){
        loadUserCredentials();
        $http.get(API_ENDPOINT.url + '/customers').then(function(result){
          if (result.data){            
            resolve(result.data);
          }else{
            reject("PROBLEM!");
          }
        })
      })      
    }
    
    var logout = function(){
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }
    
    return {
      login: login,
      register: register,
      logout: logout,
      customers: customers,
      isAuthenticated: function(){return isAuthenticated;}
    };
})