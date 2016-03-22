(function() {
  'use strict';

  angular
    .module('orders')
    .controller('ReciptController', ReciptController);

  ReciptController.$inject = ['$scope', 'OrdersService', '$stateParams'];

  function ReciptController($scope, OrdersService, $stateParams) {
    var vm = this;
    vm.order = {};

    // Recipt controller logic
    // ...

    $scope.recipt = function(){
      console.log($stateParams.orderId);
      var getorder = OrdersService.get({ orderId: $stateParams.orderId }, function() {
        vm.order = getorder;
        console.log(getorder);
      });
    };
  }
})();
