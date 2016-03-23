(function() {
  'use strict';

  angular
    .module('orders')
    .controller('CartController', CartController);

  CartController.$inject = ['$scope','OrdersService','$location','$state', '$http'];

  function CartController($scope, OrdersService, $location, $state, $http) {
    var vm = this;
    $scope.preOrder = null;
    $scope.homePagelink = "http://localhost:3000/";

    //Get Init Order from local
    $scope.getInitOrder = function(){
      $http({
        url: '/api/orders',
        type: 'get'
      }).then(function(ordersData) {
        var orders = ordersData.data;
        for(var i = 0; i < orders.length; i++){
          if(orders[i].status === 'preorder'){
            $scope.preOrder = orders[i];
            break;
          }
        }
        console.log($scope.preOrder);
      });
    };
    $scope.linkOperation = function(dish){
      // $state.go('dishes.view',{ dishId: dish._id });
      $location.path('/dishes/'+ dish._dish);
    }
    $scope.decreaseQuantity = function(dish){
      if(dish.quantity > 0){
        dish.quantity--;
        dish.sumPrice = dish.price * dish.quantity;
        $scope.preOrder.totalPrice = $scope.preOrder.totalPrice - dish.price;
      }
      else{
        dish.quantity = 0;
        $scope.preOrder.totalPrice = 0;
      }
    };

    $scope.increaseQuantity = function(dish){
      dish.quantity++;
      dish.sumPrice = dish.price * dish.quantity;
      $scope.preOrder.totalPrice = $scope.preOrder.totalPrice + dish.price;
    };
    $scope.updateOrder = function(){
      var order = $scope.preOrder;
      // order.status = 'ordered';
      OrdersService.update({ id: $scope.preOrder._id }, order)
        .$promise.then(function(response){
          $state.go('deliver-info',{ orderId: order._id });
        });
    };
  }
})();
