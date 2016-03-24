(function () {
  'use strict';

  // Dishes controller
  angular
  .module('dishes')
  .controller('DishesController', DishesController);

  DishesController.$inject = ['$scope', '$state', 'Authentication', 'OrdersService', 'dishResolve'];

  function DishesController ($scope, $state, Authentication, OrdersService, dish) {
    var vm = this;

    vm.authentication = Authentication;
    vm.dish = dish;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.addIngredient = addIngredient;
    vm.orders = [];
    vm.createLocalOrder = createLocalOrder;
    vm.addCookingSteps = addCookingSteps;

    function addIngredient(){

      vm.dish.ingredients = vm.dish.ingredients || [];
      vm.dish.ingredients.push({
        name:vm.dish.ingredient.name,
        weight:vm.dish.ingredient.weight
      });

      vm.dish.ingredient.name = '';
      vm.dish.ingredient.weight = '';
    }
    // cookingSteps
    function addCookingSteps(){
      vm.dish.cookingSteps = vm.dish.cookingSteps || [];
      vm.dish.cookingSteps.push(
        vm.dish.cookingStep
        );
      vm.dish.cookingStep = '';
    }

    function createLocalOrder(dishId){
      // console.log("hello");
      // let order = dishService.getData();
      // vm.orders.push(vm.dish);
      // console.log(vm.orders);
      // vm.dishService.setData(vm.orders);

      if (vm.authentication.user === '') {
        $state.go('authentication.signin');
      }else{
        vm.order = new OrdersService();
        vm.order.dishId = dishId;
        vm.order.$save(successCallback, errorCallback);
      }
      function successCallback(res) {
        $state.go('dishes.view', {
          dishId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    }

    // Remove existing Dish
    function remove() {
      console.log(11);
      if (confirm('Are you sure you want to delete?')) {
        vm.dish.$remove($state.go('dishes.list'));
      }
    }

    // Save Dish
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.dishForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.dish._id) {
        vm.dish.$update(successCallback, errorCallback);
      } else {
        vm.dish.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('dishes.view', {
          dishId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
