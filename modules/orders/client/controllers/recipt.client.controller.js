(function() {
  'use strict';

  angular
    .module('orders')
    .controller('ReciptController', ReciptController);

  ReciptController.$inject = ['$scope'];

  function ReciptController($scope) {
    var vm = this;

    // Recipt controller logic
    // ...

    $scope.recipt = function(){
      var getorder = OrdersService.get({ orderId: $stateParams.orderId }, function() {
        vm.orders = getorder;
      });
      };
  }
})();
