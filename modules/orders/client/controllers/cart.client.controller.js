(function() {
  'use strict';

  angular
    .module('orders')
    .controller('CartController', CartController);

  CartController.$inject = ['$scope'];

  function CartController($scope) {
    var vm = this;

    // Cart controller logic
    // ...

    init();

    function init() {
    }
  }
})();
