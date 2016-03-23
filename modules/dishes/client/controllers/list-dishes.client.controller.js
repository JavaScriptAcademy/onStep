(function () {
  'use strict';

  angular
  .module('dishes')
  .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['DishesService','RandomService','OrdersService','Authentication','$state'];

  function DishesListController(DishesService,RandomService,OrdersService,Authentication,$state) {
    var vm = this;
    vm.dishes = DishesService.query();
    vm.ramdomDishes = RandomService.query();
    vm.authentication = Authentication;


    vm.createLocalOrder = createLocalOrder;
    function createLocalOrder(dishId){
      // console.log("hello");
      // let order = dishService.getData();
      // vm.orders.push(vm.dish);
      // console.log(vm.orders);
      // vm.dishService.setData(vm.orders);

      if (vm.authentication.user === '') {
        $state.go('authentication.signin');
      }else{
        vm.order = new OrdersService();
        vm.order.dishId = dishId;
        vm.order.$save(successCallback, errorCallback);

      }
      function successCallback(res) {

      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }

  }
})();
