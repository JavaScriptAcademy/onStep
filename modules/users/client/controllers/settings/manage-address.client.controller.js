'use strict';

angular.module('users').controller('addressManageController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;
    var self = this;
    // self.user.address ='';

    // Change user address
    $scope.updateAddress = function () {
      $scope.success = $scope.error = null;

      $http.post('/api/users/address', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.addIngredient = function (){
      $scope.user.addresses = $scope.user.addresses || [];
      $scope.user.addresses.push({
        // self.user.address
      });
      self.user.address = '';
    };


  }
]);
