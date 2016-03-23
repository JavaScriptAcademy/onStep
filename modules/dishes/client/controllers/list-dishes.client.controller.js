(function () {
  'use strict';

  angular
    .module('dishes')
    .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['DishesService','RandomService','OrdersService', '$http', 'Socket'];

  function DishesListController(DishesService,RandomService,OrdersService,$http,Socket) {
    var vm = this;
    vm.dishes = DishesService.query();
    vm.ramdomDishes = RandomService.query();

    var cartNo = null;
    vm.createLocalOrder = createLocalOrder;
    function createLocalOrder(dishId){
      // console.log("hello");
      // let order = dishService.getData();
      // vm.orders.push(vm.dish);
      // console.log(vm.orders);
      // vm.dishService.setData(vm.orders);

      $http({
        url: '/api/orders',
        type: 'get'
      }).then(function(ordersData) {
        var orders = ordersData.data;
        for(var i = 0; i < orders.length; i++){
          if(orders[i].status === 'preorder'){
            cartNo = orders[i].dishes.length + 1;
            console.log("cartNo: ", cartNo);
            break;
          }
        }
      });

      Socket.emit('addToOrder',{'cartNo': cartNo})

      vm.order = new OrdersService();
      vm.order.dishId = dishId;
      vm.order.$save(successCallback, errorCallback);

      function successCallback(res) {

      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }

  }
})();
