(function() {
  'use strict';

  angular
    .module('orders')
    .controller('DeliverInfoController', DeliverInfoController);

  DeliverInfoController.$inject = ['$scope','OrdersService'];

  function DeliverInfoController($scope, OrdersService) {
    var vm = this;
    $scope.deliverInfo = {
      address: null,
      name: null,
      phone: null,
      time: {
        date: null,
        time: null
      }
    }
    $scope.deliverInfos={};

    $scope.getUserDeliverInfo = function(){
      var deliverInformation = {
        addresses: ["Chongwenhuayuan Unit 10, Room 2003, Nanshan district, Shenzhen City", "Nanshan District, Hitech park, Shenzhen"],
        names: ["Claire", "Wenjing", "Miss Liu"],
        phones: ["12345678911", "122334467788"],
      }
      $scope.deliverInfos = {
        addresses: deliverInformation.addresses,
        names: deliverInformation.names,
        phones: deliverInformation.phones,
        time: {
        date: null,
        time: null
        }
      }
    }

    $scope.updateOrder = function(){
      var order = OrdersService.get({orderId:'56ee2f25d90a31b021022fc9'}, function() {
        order.deliverInfo = $scope.deliverInfo;
        order.status = 'Paying';
        console.log(order);

        //Redict after save
        order.$save(function (response) {
          $location.path('orders/pay/' + response.id);
        }, function (errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });
    }
  }
})();