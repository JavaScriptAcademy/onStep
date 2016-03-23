//Dishes service used to communicate Dishes REST endpoints
(function () {
  'use strict';

  angular
    .module('dishes')
    .factory('AllDishesService', AllDishesService);

  AllDishesService.$inject = ['$resource'];

  function AllDishesService($resource) {
    return $resource('api/dishes/listall');
  }
})();
