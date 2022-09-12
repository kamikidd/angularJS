(function () {
    'use strict';
  
    angular.module('data')
      .controller('ShowDetailItemsController', ShowDetailItemsController);
  
      ShowDetailItemsController.$inject = ['detailItems'];
    function ShowDetailItemsController(detailItems) {
      var showdetailitems = this;
      showdetailitems.detailItems = detailItems;
  
      
    }
  
  })();
  