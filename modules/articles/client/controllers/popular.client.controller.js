(function() {
  'use strict';

  angular
    .module('articles')
    .controller('PopularController', PopularController);

  PopularController.$inject = ['$scope','Articles','Authentication'];

  function PopularController($scope, Articles, Authentication) {
    var vm = this;

    $scope.articles = Articles.query();
    $scope.user = Authentication.user;

    // Popular controller logic
    // ...

    init();

    function init() {
    }
  }
})();
