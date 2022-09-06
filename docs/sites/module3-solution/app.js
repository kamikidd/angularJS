(function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItems)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    function foundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&',
                onEmpty: '<'
            },
            controller: NarrowItDownController,
            controllerAs: 'narrowdown',
            bindToController: true
        };
        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowdown = this;
        narrowdown.searchTerm = '';

        narrowdown.matchedMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (items) {
                if (items && items.length > 0) {
                    narrowdown.message = '';
                    narrowdown.found = items;
                } else {
                    narrowdown.found = [];
                    narrowdown.message = 'Nothing found!';
                }
            });
        }


        narrowdown.removeItem = function (itemIndex) {
            narrowdown.found.splice(itemIndex, 1);
        };

    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
            }).then(function (result) {
                var foundItems = [];
                for (var i = 0; i < result.data['menu_items'].length; i++) {
                    var name = result.data['menu_items'][i]['description'];
                    if (searchTerm.length > 0 && name.toLowerCase().indexOf(searchTerm) !== -1) {
                        foundItems.push(result.data['menu_items'][i]);
                    }
                }
                return foundItems;
            });

        };

    }

})();