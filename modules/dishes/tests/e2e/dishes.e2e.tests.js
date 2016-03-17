'use strict';

describe('Dishes E2E Tests:', function () {
  describe('Test Dishes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/dishes');
      expect(element.all(by.repeater('dish in dishes')).count()).toEqual(0);
    });
  });
});
