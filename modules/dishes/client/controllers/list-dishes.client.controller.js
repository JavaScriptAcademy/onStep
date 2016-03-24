(function () {
  'use strict';

  angular
  .module('dishes')
  .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['$rootScope', 'DishesService','OrdersService','Authentication','$state'];

  function DishesListController($rootScope, DishesService, OrdersService, Authentication, $state) {
    var vm = this;
    vm.authentication = Authentication;

    vm.dishes = DishesService.query();
    vm.topDish = DishesService.getTopDish();
    vm.ramdomDishes = DishesService.randomDish();

    vm.createLocalOrder = createLocalOrder;
    var cartNo = null;


    function createLocalOrder(dishId){
      $rootScope.$broadcast('getCartDishNumber', { dishId: dishId });

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
