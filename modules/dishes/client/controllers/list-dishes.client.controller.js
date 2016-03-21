(function () {
  'use strict';

  angular
    .module('dishes')
    .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['DishesService', 'dishService'];

  function DishesListController(DishesService, dishService) {
    var vm = this;
    vm.orders = [];
    vm.dishService = dishService;
    vm.createLocalOrder = createLocalOrder;

    vm.dishes = DishesService.query();


    function createLocalOrder(){
      console.log("hello");
      let order = dishService.getData();
      vm.orders.push(vm.dish);
      console.log(vm.orders);
      vm.dishService.setData(vm.orders);
    }
  }
})();
