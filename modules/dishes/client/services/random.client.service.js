//Dishes service used to communicate Dishes REST endpoints
(function () {
  'use strict';

  angular
    .module('dishes')
    .factory('RandomService', RandomService);

  RandomService.$inject = ['$resource'];

  function RandomService($resource) {
    return $resource('api/dishes/getRandom');
  }
})();
