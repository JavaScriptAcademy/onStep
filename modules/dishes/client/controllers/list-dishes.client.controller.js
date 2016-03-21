(function () {
  'use strict';

  angular
    .module('dishes')
    .controller('DishesListController', DishesListController);

  DishesListController.$inject = ['DishesService','RandomService'];

  function DishesListController(DishesService,RandomService) {
    var vm = this;
    vm.dishes = DishesService.query();
    vm.ramdomDishes = RandomService.query();


  }
})();
