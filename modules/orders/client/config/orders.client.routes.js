(function () {
  'use strict';

  angular
    .module('orders')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('recipt', {
        url: '/recipt/:orderId',
        templateUrl: 'modules/orders/client/views/recipt.client.view.html',
        controller: 'ReciptController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('pay', {
        url: '/pay/:orderId',
        templateUrl: 'modules/orders/client/views/pay.client.view.html',
        controller: 'PayController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('deliver-info', {
        url: '/deliver-info/:orderId',
        templateUrl: 'modules/orders/client/views/deliver-info.client.view.html',
        controller: 'DeliverInfoController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('cart', {
        url: '/cart',
        templateUrl: 'modules/orders/client/views/cart.client.view.html',
        controller: 'CartController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('orders.list', {
        url: '',
        templateUrl: 'modules/orders/client/views/list-orders.client.view.html',
        controller: 'OrdersListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Orders List'
        }
      })
      // .state('orders.create', {
      //   url: '/create',
      //   templateUrl: 'modules/orders/client/views/form-order.client.view.html',
      //   controller: 'OrdersController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     orderResolve: newOrder
      //   },
      //   data: {
      //     roles: ['user', 'admin'],
      //     pageTitle : 'Orders Create'
      //   }
      // })
      .state('orders.edit', {
        url: '/:orderId/edit',
        templateUrl: 'modules/orders/client/views/form-order.client.view.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Order {{ orderResolve.name }}'
        }
      })
      .state('orders.view', {
        url: '/:orderId',
        templateUrl: 'modules/orders/client/views/view-order.client.view.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data:{
          roles: ['user', 'admin'],
          pageTitle: 'Order {{ articleResolve.name }}'
        }
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.get({
      orderId: $stateParams.orderId
    }).$promise;
  }

  newOrder.$inject = ['OrdersService'];

  function newOrder(OrdersService) {
    return new OrdersService();
  }
})();
