(function () {
  'use strict';

  angular
    .module('dishes')
    .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['DishesService'];

  function DishesListController(DishesService) {
    var vm = this;

    vm.dishes = DishesService.query();
  }
})();
