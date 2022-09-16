(function () {
    'use strict';
    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService'];
    function SignUpController(MenuService) {
        var reg = this;
        reg.errorMsg = false;
        reg.successMsg = false;
        
        reg.user = {};

        reg.submit = function () {

            MenuService.getFavoriteDish(reg.user.dish_sn.toUpperCase())
                .then(function success(result) {
                    reg.user.dish_name = result.data['name'];
                    reg.user.dish_detail = result.data['description'];
                    reg.successMsg = true;
                    reg.errorMsg = false;
                    MenuService.saveUser(reg.user);
                    reg.completed = true;

                })
                .catch(function (error) {
                    reg.errorMsg = true;
                    reg.successMsg = false;
                });

            
        };


    }

})();