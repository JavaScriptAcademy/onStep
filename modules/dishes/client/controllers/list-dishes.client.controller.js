(function () {
  'use strict';

  angular
  .module('dishes')
  .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['$rootScope', 'DishesService','OrdersService','Authentication','$state', '$http'];

  function DishesListController($rootScope, DishesService, OrdersService, Authentication, $state, $http) {
    var vm = this;
    vm.authentication = Authentication;

    vm.dishes = DishesService.query();
    vm.topDish = DishesService.getTopDish();
    vm.ramdomDishes = DishesService.randomDish();

    vm.createLocalOrder = createLocalOrder;
    var cartNo = null;


    function createLocalOrder(dishId){
      $rootScope.$broadcast('getCartDishNumber', { dishId: dishId });

      // $http({
      //   url: '/api/orders',
      //   type: 'get'
      // }).then(function(ordersData) {
      //   var orders = ordersData.data;
      //   for(var i = 0; i < orders.length; i++){
      //     if(orders[i].status === 'preorder'){
      //       cartNo = orders[i].dishes.length + 1;
      //       console.log('cartNo: ', cartNo);
      //       break;
      //     }
      //   }
      // });

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
