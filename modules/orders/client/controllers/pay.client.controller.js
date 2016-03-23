(function() {
  'use strict';

  angular
    .module('orders')
    .controller('PayController', PayController);

  PayController.$inject = ['$scope', '$state', '$stateParams', 'OrdersService'];

  function PayController($scope, $state, $stateParams, OrdersService) {
    var vm = this;
    $scope.payMethods = [];
    $scope.getPayMethod = function(){
      var methods = [
        {
          name: 'AliPay',
          image: 'http://xianse.cc/upload/201410/1108204814.350x350.jpg',
          link: 'https://www.alipay.com/'
        },
        {
          name: 'WeChatPay',
          image: 'http://reso2.yiihuu.com/1288862-z.jpg',
          link: 'https://pay.weixin.qq.com/index.php/home/login?return_url=/'
        }
      ];
      $scope.payMethods = methods;
    };

    $scope.completePay = function(){
      OrdersService.get({ orderId: $stateParams.orderId }, function(order) {
        order.status = 'paid';
        //Redict after save
        OrdersService.update({ id: $stateParams.orderId }, order)
          .$promise.then(function(response){
            $state.go('recipt',{ orderId: $stateParams.orderId });
          });
      });
    };
  }
})();
