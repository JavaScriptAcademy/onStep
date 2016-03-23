(function () {
  'use strict';

  angular
    .module('dishes')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Dishes',
      state: 'dishes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'dishes', {
      title: 'List Dishes',
      state: 'dishes.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'dishes', {
      title: 'Create Dish',
      state: 'dishes.create',
      roles: ['admin']
    });
  }
})();
