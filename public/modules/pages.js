angular.module('pages', ['angularUtils.directives.dirPagination','services'])
  .controller('loginCtrl', LoginCtrl)
  .controller('registerCtrl', RegisterCtrl)
  .controller('homeCtrl', HomeCtrl)
  .controller('homeTable', HomeTable)
  .controller('profielCtrl', ProfielCtrl)
  .controller('creditsCtrl', CreditsCtrl)
  .controller('facturenCtrl', FacturenCtrl)

function LoginCtrl($scope, AuthService, $location){
  $scope.user = {
    name: '',
    password: ''
  }
  
  $scope.login = function(){
    AuthService.login($scope.user).then(function(msg){
      $location.path('/home');
    }, function(errMsg){
      console.log("Error:" + errMsg);
    });
  }  
}

function RegisterCtrl($scope, AuthService, $location){
  $scope.user = {
    name: '',
    password: ''
  }
  
  $scope.signup = function(){
    AuthService.register($scope.user).then(function(msg){
      $location.path('/home');
    }, function(errMsg){
      console.log("Error:" + errMsg);
    });
  } 
}

function HomeCtrl(){
}

function HomeTable($scope, AuthService){
    $scope.users = []; //declare an empty array
    AuthService.customers().then(function(msg){
      $scope.users = msg;
    }, function(errMsg){
      console.log("Error:" + errMsg);
    });    

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
}

function ProfielCtrl(){
}

function CreditsCtrl(){
}

function FacturenCtrl(){
}