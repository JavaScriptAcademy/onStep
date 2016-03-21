(function () {
  'use strict';

  angular
    .module('core')
    .factory('dishService', dishService);

  dishService.$inject = [ '$window', '$rootScope' ];

  function dishService( $window, $rootScope) {
    return {
      setData: function(val) {
        $window.localStorage && $window.localStorage.setItem( 'newOrder', JSON.stringify(val) );
        return this;
      },
      getData: function() {
        return $window.localStorage && JSON.parse( $window.localStorage.getItem('newOrder') );
      }
    };
  }
})();
