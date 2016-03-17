//Dishes service used to communicate Dishes REST endpoints
(function () {
  'use strict';

  angular
    .module('dishes')
    .factory('DishesService', DishesService);

  DishesService.$inject = ['$resource'];

  function DishesService($resource) {
    return $resource('api/dishes/:dishId', {
      dishId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
