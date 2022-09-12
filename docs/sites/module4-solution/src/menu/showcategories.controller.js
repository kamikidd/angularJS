(function () {
  'use strict';

  angular.module('data')
    .controller('ShowCategoriesController', ShowCategoriesController);

  ShowCategoriesController.$inject = ['items'];
  function ShowCategoriesController(items) {
    var showcategories = this;
    showcategories.items = items;

    
  }

})();
