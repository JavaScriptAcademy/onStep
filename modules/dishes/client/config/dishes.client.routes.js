(function () {
  'use strict';

  angular
    .module('dishes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller:'DishesListController',
        templateUrl: 'modules/dishes/client/views/home-dishes.client.view.html',
        controllerAs: 'vm'
      })
      .state('dishes', {
        abstract: true,
        url: '/dishes',
        template: '<ui-view/>',
      })
      // .state('dishes.list', {
      //   url: '',
      //   templateUrl: 'modules/dishes/client/views/list-dishes.client.view.html',
      //   controller: 'DishesListController',
      //   controllerAs: 'vm',
      //   data: {
      //     pageTitle: 'Dishes List'
      //   }
      // })

      .state('dishes.list', {
        url: '',
        templateUrl: 'modules/dishes/client/views/all-dishes.client.view.html',
        controller: 'DishesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Dishes List'
        }
      })

      .state('dishes.create', {
        url: '/create',
        templateUrl: 'modules/dishes/client/views/form-dish.client.view.html',
        controller: 'DishesController',
        controllerAs: 'vm',
        resolve: {
          dishResolve: newDish
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Dishes Create'
        }
      })
      .state('dishes.edit', {
        url: '/:dishId/edit',
        templateUrl: 'modules/dishes/client/views/form-dish.client.view.html',
        controller: 'DishesController',
        controllerAs: 'vm',
        resolve: {
          dishResolve: getDish
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Dish {{ dishResolve.name }}'
        }
      })
      .state('dishes.view', {
        url: '/:dishId',
        templateUrl: 'modules/dishes/client/views/view-dish.client.view.html',
        controller: 'DishesController',
        controllerAs: 'vm',
        resolve: {
          dishResolve: getDish
        },
        data:{
          pageTitle: 'Dish {{ articleResolve.name }}'
        }
      });
  }

  getDish.$inject = ['$stateParams', 'DishesService'];

  function getDish($stateParams, DishesService) {
    return DishesService.get({
      dishId: $stateParams.dishId
    }).$promise;
  }

  newDish.$inject = ['DishesService'];

  function newDish(DishesService) {
    return new DishesService();
  }
})();
