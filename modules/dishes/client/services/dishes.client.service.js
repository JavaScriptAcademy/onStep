//Dishes service used to communicate Dishes REST endpoints
(function () {
  'use strict';

  angular
  .module('dishes')
  .factory('DishesService', DishesService);

  DishesService.$inject = ['$resource'];

  function DishesService($resource) {
    return $resource('api/dishes/:dishId/:getDishes', {
      dishId: '@_id',
      getDishes: '@getDishes'
    }, {
      update: {
        method: 'PUT'
      },
      getTopDish: {
        method: 'GET',
        params: {
          getDishes: 'listTop'
        },
        isArray:true
      },
      randomDish: {
        method: 'GET',
        params: {
          getDishes: 'getRandom'
        },
        isArray:true
      }
    });
  }
})();
