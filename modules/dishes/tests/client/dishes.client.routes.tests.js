(function () {
  'use strict';

  describe('Dishes Route Tests', function () {
    // Initialize global variables
    var $scope,
      DishesService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DishesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DishesService = _DishesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('dishes');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/dishes');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DishesController,
          mockDish;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('dishes.view');
          $templateCache.put('modules/dishes/client/views/view-dish.client.view.html', '');

          // create mock Dish
          mockDish = new DishesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Dish Name'
          });

          //Initialize Controller
          DishesController = $controller('DishesController as vm', {
            $scope: $scope,
            dishResolve: mockDish
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:dishId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.dishResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            dishId: 1
          })).toEqual('/dishes/1');
        }));

        it('should attach an Dish to the controller scope', function () {
          expect($scope.vm.dish._id).toBe(mockDish._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/dishes/client/views/view-dish.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DishesController,
          mockDish;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('dishes.create');
          $templateCache.put('modules/dishes/client/views/form-dish.client.view.html', '');

          // create mock Dish
          mockDish = new DishesService();

          //Initialize Controller
          DishesController = $controller('DishesController as vm', {
            $scope: $scope,
            dishResolve: mockDish
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.dishResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/dishes/create');
        }));

        it('should attach an Dish to the controller scope', function () {
          expect($scope.vm.dish._id).toBe(mockDish._id);
          expect($scope.vm.dish._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/dishes/client/views/form-dish.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DishesController,
          mockDish;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('dishes.edit');
          $templateCache.put('modules/dishes/client/views/form-dish.client.view.html', '');

          // create mock Dish
          mockDish = new DishesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Dish Name'
          });

          //Initialize Controller
          DishesController = $controller('DishesController as vm', {
            $scope: $scope,
            dishResolve: mockDish
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:dishId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.dishResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            dishId: 1
          })).toEqual('/dishes/1/edit');
        }));

        it('should attach an Dish to the controller scope', function () {
          expect($scope.vm.dish._id).toBe(mockDish._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/dishes/client/views/form-dish.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
