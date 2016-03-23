(function() {
  'use strict';

  angular
    .module('orders')
    .controller('ReciptController', ReciptController);

  ReciptController.$inject = ['$scope', 'OrdersService', '$stateParams', '$location'];

  function ReciptController($scope, OrdersService, $stateParams, $location) {
    var vm = this;
    vm.order = {};

    // Recipt controller logic
    // ...
    $scope.date = new Date();

    $scope.recipt = function(){
      console.log($stateParams.orderId);
      var getorder = OrdersService.get({ orderId: $stateParams.orderId }, function() {
        vm.order = getorder;
        console.log(getorder);
      });
    };
    $scope.print = function(){};

    $scope.close = function(){
      // $state.go('home',{});
      $location.path('/');
    };
  }
})();
