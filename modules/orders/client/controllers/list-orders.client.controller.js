(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['OrdersService', 'Authentication'];

  function OrdersListController(OrdersService, Authentication) {
    var vm = this;

    vm.orders = OrdersService.query();

  }
})();
