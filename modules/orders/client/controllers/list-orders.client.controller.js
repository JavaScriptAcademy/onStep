(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['OrdersService', 'Authentication','ngMaterial'];

  function OrdersListController(OrdersService, Authentication, ngMaterial) {
    var vm = this;

    vm.orders = OrdersService.query();

  }
})();
