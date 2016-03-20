(function() {
  'use strict';

  angular
    .module('orders')
    .controller('DeliverInfoController', DeliverInfoController);

  DeliverInfoController.$inject = ['$scope'];

  function DeliverInfoController($scope) {
    var vm = this;

    // Deliver info controller logic
    // ...

    init();

    function init() {
    }
  }
})();
