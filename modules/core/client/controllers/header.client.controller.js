'use strict';

angular.module('core').controller('HeaderController', ['OrdersService', '$rootScope', '$scope', '$state', 'Authentication', 'Menus',
  function (OrdersService, $rootScope, $scope, $state, Authentication, Menus) {
    var vm = this;
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    var userId = $scope.authentication.user._id;


      vm.dish = OrdersService.query()
      .$promise
      .then(function(orders){
        vm.dishNumber = 0;
        orders.forEach(function(order){
          if (order.status === 'preorder') {
            order.dishes.forEach(function(dish){
              vm.dishNumber += dish.quantity;
            });
          }
        });
      });


    $rootScope.$on('getCartDishNumber', function(e, value) {
      if (value.value === 0) {
        vm.dishNumber = 0;
      }else{
       vm.dishNumber += 1;
      }
    });

  }
  ]);
