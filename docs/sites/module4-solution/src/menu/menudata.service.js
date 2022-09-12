(function () {
  'use strict';
  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$q', '$http', 'ApiBasePath'];
  function MenuDataService($q, $http, ApiBasePath) {
    var service = this;
    var items = [];
    var detailItems = [];

    service.getAllCategories = function () {
      var deferred = $q.defer();
      service.getCategories()
        .then(function (result) {
          items = result.data;
          deferred.resolve(items);
        },
        function(error){
          console.log(error);
        });

      return deferred.promise;
    };



    service.getCategories = function () {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
    };


  service.getItemsForCategory = function(itemShortName){
    var deferred = $q.defer();

    service.getItemsByShortName(itemShortName)
    .then( function(response) {
      detailItems = response.data.menu_items;
      deferred.resolve(detailItems);
    })
    .catch( function(error){
      console.log(error);
    })

    return deferred.promise;
  };

  service.getItemsByShortName = function(itemShortName){
    return  $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + itemShortName)
      });

};

};
}) ();

