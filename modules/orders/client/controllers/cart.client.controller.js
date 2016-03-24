(function() {
  'use strict';

  angular
    .module('orders')
    .controller('CartController', CartController);

  CartController.$inject = ['$window', '$scope','OrdersService','$location','$state', '$http'];

  function CartController($window, $scope, OrdersService, $location, $state, $http) {
    var vm = this;
    $scope.preOrder = null;
    $scope.homePagelink = 'http://localhost:3000/';

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
      });
    };
    $scope.linkOperation = function(dish){
      // $state.go('dishes.view',{ dishId: dish._id });
      $location.path('/dishes/'+ dish._dish);
    };

    $scope.decreaseQuantity = function(dish){
      if(dish.quantity > 1){
        dish.quantity--;
        dish.sumPrice = dish.price * dish.quantity;
        $scope.preOrder.totalPrice = $scope.preOrder.totalPrice - dish.price;
      }
      else{
        window.alert("Can not stand lesser!");
        /*dish.quantity = 0;
        $scope.preOrder.totalPrice = 0;*/
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

    $scope.removeDish = function(dish){
      debugger;
      console.log("a");
      for(var i = 0; i < $scope.preOrder.dishes.length; i++){
        if(dish._dish === $scope.preOrder.dishes[i]._dish){
          $scope.preOrder.dishes.splice(i,1);
          $scope.preOrder.totalPrice = $scope.preOrder.totalPrice - dish.price*dish.quantity;
          OrdersService.update({ id: $scope.preOrder._id }, $scope.preOrder)
          .$promise.then(function(response){
            console.log(response);
          });
        }
      }
      if($scope.preOrder.dishes.length == 0){
        console.log($scope.preOrder._id);
        $scope.preOrder.$remove( function (){
          console.log("success");
          $scope.preOrder = null;
          OrdersService.get({id: $scope.preOrder._id})
          .$promise.then(function(order){
            order.remove();
          })
        });
      }
    }

  }
})();
