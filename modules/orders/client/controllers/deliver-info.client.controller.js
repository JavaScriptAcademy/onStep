(function() {
  'use strict';

  angular
    .module('orders')
    .controller('DeliverInfoController', DeliverInfoController);

  DeliverInfoController.$inject = ['$rootScope', '$scope','OrdersService','$location', '$state', '$stateParams', 'Authentication'];

  function DeliverInfoController($rootScope, $scope, OrdersService, $location, $state, $stateParams, Authentication) {
    var vm = this;
    $scope.deliverInfo = {
      address: null,
      name: null,
      phone: null,
      time: {
        date: null,
        time: null
      }
    };
    $scope.deliverInfos={};

    $scope.myDate = new Date();
    $scope.minDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth(),
      $scope.myDate.getDate()
    );
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 6,
      $scope.myDate.getDate()
    );

    $scope.getUserDeliverInfo = function(){
      $scope.user = Authentication.user;
      console.log($scope.user.deliveryInfo);
      var deliverInformation = $scope.user.deliveryInfo;
      $scope.deliverInfos = {
        addresses: deliverInformation.addresses,
        names: deliverInformation.names,
        phones: deliverInformation.phones,
        time: {
          date: null,
          time: null
        }
      };
    };

    $scope.updateOrder = function(){
      var order = OrdersService.get({ orderId: $stateParams.orderId }, function() {
        order.deliverInfo = $scope.deliverInfo;
        order.status = 'paying';
        //Redict after save
        OrdersService.update({ id: $stateParams.orderId }, order)
          .$promise.then(function(response){
            $rootScope.$broadcast('getCartDishNumber');
            $state.go('pay',{ orderId: $stateParams.orderId });
          });
      });


    };
  }
})();
