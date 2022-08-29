(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.str = "";
        $scope.amount = -1;
        $scope.showMessage = function () {
            $scope.amount = checkAmount();
            if ($scope.amount == 0) {
                $scope.msg = "Please enter data first";
            } else {
                if ($scope.amount  <= 3) {
                    $scope.msg = "Enjoy!";
                } else {
                    $scope.msg = "Too much!";
                }
            }
        };


        function checkAmount() {
            var foodlist = $scope.str.split(',');
            //  do NOT consider any empty item
            var filteredlist = foodlist.filter(function (fl) {
                return fl != '';
            });

            return filteredlist.length;
        };
    }
})();
