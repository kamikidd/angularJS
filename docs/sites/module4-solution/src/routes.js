(function (){
    'use strict';
    angular.module('MenuApp').config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
    function RoutesConfig($stateProvider,$urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider

        //Home
        .state('home',{
            url: '/',
            templateUrl: '/src/menu/templates/home.html'
        })

        //category page
        .state('showcategories',{
            url:'/categories',
            templateUrl: 'src/menu/templates/categories.html',
            controller: 'ShowCategoriesController as showcategories',
            resolve: {
                items: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('showdetailitems',{
            url:'/items/{itemShortName}',
            templateUrl:'src/menu/templates/items.template.html',
            controller: 'ShowDetailItemsController as showdetailitems',
            resolve:{
                detailItems: ['$stateParams', 'MenuDataService',function( $stateParams, MenuDataService){
                    return MenuDataService.getItemsForCategory($stateParams.itemShortName);
                }]
            }
        });
    }
})();