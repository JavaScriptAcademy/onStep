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

    vm.dish = OrdersService.getUserOrder({
      _userId:userId
    }).$promise.then(function(orders){
      console.log(orders);
      vm.dishNumber = 0;
      orders[0].dishes.forEach(function(dish){
        if(dish.status === 'preorder'){
          vm.dishNumber += dish.quantity;
        }
      });
    });

    $rootScope.$on('getCartDishNumber', function(e, value) {
      vm.dishNumber += 1;
    });

  }
]);
