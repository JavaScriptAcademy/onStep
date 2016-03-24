(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['$state','OrdersService', 'Authentication'];

  function OrdersListController($state, OrdersService, Authentication) {
    var vm = this;

    vm.orders = OrdersService.query();
    vm.tab = 1;
    vm.setTab = function(newTab){
      vm.tab = newTab;
    };

    vm.isSet = function(tabNum){
      return vm.tab === tabNum;
    };
    vm.goToPay = function(order){
      $state.go('pay',{ orderId: order._id });
    };
    vm.goToRecipt = function(order){
      $state.go('recipt',{ orderId: order._id });
    };
  }
})();
