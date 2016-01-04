angular.module('main', ['ngRoute','core','pages','services'])
  .constant('AUTH_EVENTS',{
    notAuthenticated: 'auth-not-authenticated'
  })
  .constant('API_ENDPOINT', {
    url: 'http://preview.qvidndjep9b8d7vijo9fzqyypaa46lxrt3vjwxgltluqsemi.box.codeanywhere.com:3000/api'
  })
  .controller('adminCtrl', AdminCtrl)  
  .config(function($routeProvider){
    $routeProvider.when('/profiel',{
      templateUrl: 'views/profiel.html',
      controller:'profielCtrl'
    });
    $routeProvider.when('/credits',{
      templateUrl: 'views/credits.html',
      controller: 'creditsCtrl'
    });
    $routeProvider.when('/facturen',{
      templateUrl: 'views/facturen.html',
      controller: 'facturenCtrl'
    });
    $routeProvider.when('/home',{
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    });
    $routeProvider.when('/register',{
      templateUrl: 'views/register.html',
      controller: 'registerCtrl'
    });
    $routeProvider.otherwise({
      templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    });
  });

function AdminCtrl($scope, currentSpot) {
  $scope.isActive = isActive;
  $scope.getTitle = getTitle;

  function isActive(menuId){
    return currentSpot.getActiveMenu() == menuId;
  }

  function getTitle(){
    return currentSpot.getTitle();
  }
}
