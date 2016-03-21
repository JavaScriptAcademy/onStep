(function() {
  'use strict';

  angular
    .module('orders')
    .controller('CartController', CartController);

  CartController.$inject = ['$scope','OrdersService','$location','$state'];

  function CartController($scope, OrdersService, $location, $state) {
    var vm = this;
    $scope.order = {
      _creator: null,
      dishes: [],
      deliverInfo: {
        address: null,
        name: null,
        phone: null,
        time: {
          date: null,
          time: null
        }
      },
      status: 'PreOrder',
      totalPrice: 0
    };

    //Get Init Order from local
    $scope.getInitOrder = function(){
      $scope.order.dishes = [{
        id: '56ee220493672e9c1944babc',
        name: 'toduosi',
        unitPrice: 20,
      },
      {
        id: '56ee2e7b93672e9c1944babe',
        name: 'Yurou',
        unitPrice: 50,
      }];

      angular.forEach($scope.order.dishes,function(dish, key){
        dish.quantity = 1;
        dish.sumPrice = dish.unitPrice;
        $scope.order.totalPrice += dish.sumPrice;
      });
    };

    $scope.decreaseQuantity = function(dish){
      if(dish.quantity > 0){
        dish.quantity--;
        dish.sumPrice = dish.unitPrice * dish.quantity;
        $scope.order.totalPrice = $scope.order.totalPrice - dish.unitPrice;
      }
      else
        dish.quantity = 0;
    };

    $scope.increaseQuantity = function(dish){
      dish.quantity++;
      dish.sumPrice = dish.unitPrice * dish.quantity;
      $scope.order.totalPrice = $scope.order.totalPrice + dish.unitPrice;
    };

    $scope.create = function(){
      var order = new OrdersService({
        _creator: null,
        dishes: $scope.order.dishes,
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

    };
  }
})();
