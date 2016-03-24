(function () {
  'use strict';

  angular
    .module('orders')
    .run(menuConfig);
  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Orders',
      state: 'orders.list',
      type: 'item',
      roles: ['user','admin']
    });

    Menus.addMenuItem('topbar', {
      title: 'Cart',
      state: 'cart',
      type: 'item',
      badge: true,
      roles: ['user','admin']
    });


    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'orders', {
      title: 'List Orders',
      state: 'orders.list',
      roles:['user','admin']
    });

    // Add the dropdown create item
    // Menus.addSubMenuItem('topbar', 'orders', {
    //   title: 'Create Order',
    //   state: 'orders.create',
    //   roles: ['user']
    // });
  }
})();
