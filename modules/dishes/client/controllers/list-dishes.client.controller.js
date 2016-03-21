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


    function createLocalOrder(id) {
      return DishesService.get({
        dishId: id
      }).$promise
      .then(successCallback,errorCallback);
    }

    function successCallback(dish){
      console.log('success',dish);
      var order = dishService.getData();
      vm.orders.push(dish);
      console.log(vm.orders);
      vm.dishService.setData(vm.orders);

    }
    function errorCallback(err, status){
      console.log('error', err);
    }

  }
})();
