//Orders service used to communicate Orders REST endpoints
(function () {
  'use strict';

  angular
    .module('orders')
    .factory('OrdersService', OrdersService);

  OrdersService.$inject = ['$resource'];

  function OrdersService($resource) {
    return $resource('api/orders/:orderId/:userId', {
      orderId: '@_id',
      userId: '@_userId'
    }, {
      update: {
        method: 'PUT'
      },
      getUserOrder: {
        method: 'GET',
        isArray:true
      }
    });
  }
})();
