(function() {
  'use strict';

  angular
    .module('orders')
    .controller('ReciptController', ReciptController);

  ReciptController.$inject = ['$timeout', '$state', '$scope', 'OrdersService', '$stateParams', '$location'];

  function ReciptController($timeout, $state,$scope, OrdersService, $stateParams, $location) {
    var vm = this;
    vm.order = {};

    // Recipt controller logic
    // ...
    $scope.date = new Date();

    $scope.recipt = function(){
      console.log($stateParams.orderId);
      var getorder = OrdersService.get({ orderId: $stateParams.orderId }, function() {
        vm.order = getorder;
        console.log(getorder);
      });
    };
    $scope.print = function(){
       window.print();
/*      var bdhtml=window.document.body.innerHTML;
      var sprnstr='<!--startprint-->';
      var eprnstr='<!--endprint-->';
      var prnhtml=bdhtml.substring(bdhtml.indexOf(sprnstr)+17);
      prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
      window.document.body.innerHTML=prnhtml;
      window.print();*/
        // window.close();
        // $timeout(function () { window.close(); }, 40);
        // $state.go('recipt',{ orderId: $stateParams.orderId });
    };
/*
    $scope.onPrintFinished = function(print){
      window.close();
    };*/

    $scope.close = function(){
      // $state.go('home',{});
      $location.path('/');
    };
  }
})();
