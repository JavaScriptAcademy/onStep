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

    DishesService.query().$promise.then(function(data) {
        vm.pagedItems = data;
        vm.pageItems = data.slice(0,vm.itemsPerPage);
        vm.filterLength = data.length;
    })

    // vm.pagedItems = vm.dishes;

    vm.itemsPerPage = 4;
    vm.currentPage = 1;
    vm.pageChanged = function() {
      var begin = vm.itemsPerPage*(vm.currentPage-1);
      var end = begin+vm.itemsPerPage;
      vm.pageItems = vm.pagedItems.slice(begin,end);
    }

    function createLocalOrder(dishId){
      $rootScope.$broadcast('increaseCartDishNumber');

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
