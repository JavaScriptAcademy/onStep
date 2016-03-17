(function() {
  'use strict';

  angular
    .module('articles')
    .controller('PopularController', PopularController);

  PopularController.$inject = ['$scope','Articles'];

  function PopularController($scope, Articles) {
    var vm = this;
    vm.name = 'Claire';
    $scope.user = {
      name: 'Claire',
      class: 'JS Academy'
    };
    $scope.articles = Articles.query();

    // Popular controller logic
    // ...

    init();

    function init() {
    }
  }
})();
