(function() {
  'use strict';

  angular
    .module('orders')
    .controller('DeliverInfoController', DeliverInfoController);

  DeliverInfoController.$inject = ['$scope','OrdersService','$location','$routeParams', '$route'];

  function DeliverInfoController($scope, OrdersService, $location, $routeParams, $route) {
    console.log($routeParams.orderId);
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

    $scope.getUserDeliverInfo = function(){
      var deliverInformation = {
        addresses: ["Chongwenhuayuan Unit 10, Room 2003, Nanshan district, Shenzhen City", "Nanshan District, Hitech park, Shenzhen"],
        names: ["Claire", "Wenjing", "Miss Liu"],
        phones: ["12345678911", "122334467788"],
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
      var order = OrdersService.get({ orderId:'56ee2f25d90a31b021022fc9' }, function() {
        order.deliverInfo = $scope.deliverInfo;
        order.status = 'Paying';
        console.log($location.url());
        //Redict after save
        OrdersService.update({ id:'56ee2f25d90a31b021022fc9' }, order)
          .$promise.then(function(response){
            $location.path('orders/pay/' + response.id);
          });
      });
    };
  }
})();
