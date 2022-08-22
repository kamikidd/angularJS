(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.str = "";
        $scope.showMessage = function () {
            var amount = checkAmount($scope.str);
            if (amount == 0) {
                $scope.msg = "Please enter data first";
            } else if (amount <= 3 && amount > 0) {
                $scope.msg = "Enjoy!";
            } else {
                $scope.msg = "Too much!";
            }
        };

        function checkAmount(string) {
            var food = string.split(',');
            $scope.foodAmount = 0;
            if (food == "" || food == " ") {
                $scope.foodAmount = 0;
            } else {
                $scope.foodAmount = food.length;
            }
            ;
            return $scope.foodAmount;
        };
    }
})();