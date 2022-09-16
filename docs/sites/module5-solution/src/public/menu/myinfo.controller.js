(function () {
    'use strict';
    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService','ApiPath'];

    function MyInfoController(MenuService,ApiPath) {
        var status = this;
        status.apiPath = ApiPath;
        status.user = {};
        status.signedUp = false;

        status.user = MenuService.getUser();
        if (angular.equals(status.user, {})) {
            status.signedUp = false;
        } else {
            status.signedUp = true;
        }
    };


})();