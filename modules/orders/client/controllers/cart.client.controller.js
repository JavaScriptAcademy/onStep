(function() {
  'use strict';

  angular
    .module('orders')
    .controller('CartController', CartController);

  CartController.$inject = ['$scope','OrdersService','$location','$state', '$http'];

  function CartController($scope, OrdersService, $location, $state, $http) {
    var vm = this;
    $scope.preOrder = null;

    //Get Init Order from local
    $scope.getInitOrder = function(){
      $http({
        url: '/api/orders',
        type: 'get'
      }).then(function(orders) {
        var orders = orders.data;
        for(var i = 0; i < orders.length; i++){
          if(orders[i].status == 'preorder'){
            $scope.preOrder = orders[i];
            break;
          }
        }
        console.log($scope.preOrder);
      });
    };

    $scope.decreaseQuantity = function(dish){
      if(dish.quantity > 0){
        dish.quantity--;
        // dish.sumPrice = dish.unitPrice * dish.quantity;
        $scope.preOrder.totalPrice = $scope.order.totalPrice - dish.price;
      }
      else{
        dish.quantity = 0;
      }
    };

    $scope.increaseQuantity = function(dish){
      dish.quantity++;
      // dish.sumPrice = dish.unitPrice * dish.quantity;
      $scope.preOrder.totalPrice = $scope.preOrder.totalPrice + dish.price;
    };

    $scope.updateOrder = function(){
      var order = $scope.preOrder;
      order.status = 'ordered';
      OrdersService.update({ id: $scope.preOrder._id}, order)
        .$promise.then(function(response){
          $state.go('deliver-info',{ orderId: order._id });
        });
    }
    // $scope.updateOrder = function(){
    //   var order = OrdersService.get({ orderId: }, function() {
    //     order.deliverInfo = $scope.deliverInfo;
    //     order.status = 'Paying';
    //     //Redict after save
    //     OrdersService.update({ id: $stateParams.orderId }, order)
    //       .$promise.then(function(response){
    //         $state.go('pay',{ orderId: $stateParams.orderId });
    //       });
    //   });
    // };


/*    $scope.create = function(){
      var order = new OrdersService({
        _creator: null,
        dishes: { id: '56eeb20656e94da41339984e' },
        deliverInfo: $scope.order.deliverInfo,
        status: 'Ordered',
        totalPrice: $scope.order.totalPrice
      });

      // Redirect after save
      order.$save(function (response) {
        // $location.path('/deliver-info/' + response.orderId);
        $state.go('deliver-info',{ orderId: response.orderId });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };*/
  }
})();
