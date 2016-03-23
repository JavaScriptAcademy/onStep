(function() {
  'use strict';

  angular
    .module('orders')
    .controller('DeliverInfoController', DeliverInfoController);

  DeliverInfoController.$inject = ['$scope','OrdersService','$location', '$state', '$stateParams'];

  function DeliverInfoController($scope, OrdersService, $location, $state, $stateParams) {
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
      $scope.myDate.getDate());
    $scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 6,
      $scope.myDate.getDate());

    $scope.getUserDeliverInfo = function(){
      var deliverInformation = {
        addresses: ['Chongwenhuayuan Unit 10, Room 2003, Nanshan district, Shenzhen City", "Nanshan District, Hitech park, Shenzhen'],
        names: ['Claire', 'Wenjing', 'Miss Liu'],
        phones: ['12345678911', '122334467788'],
      };
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
            $state.go('pay',{ orderId: $stateParams.orderId });
          });
      });
    };
  }
})();
