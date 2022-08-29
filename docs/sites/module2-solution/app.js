(function () {
    'use strict';

    angular
        .module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyCtrl = this;
        buyCtrl.buyList = ShoppingListCheckOffService.showToBuyItems();
        buyCtrl.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtCtrl = this;
        boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtItem();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        //List of toBuyList
        var buyList = [
            {
                name: "Tomato",
                quantity: 4
            },
            {
                name: "Bread",
                quantity: 1
            },
            {
                name: "Mineral Water",
                quantity: 2
            },
            {
                name: "Salade",
                quantity: 1
            },
            {
                name: "Apple",
                quantity: 5
            },
            {
                name: "Egg",
                quantity: 12
            }
        ];

        //List of boughtList
        var boughtList = [];

        service.showToBuyItems = function () {
            return buyList;
        };

        service.removeItem = function (itemIndex) {
            service.addToBoughtList(itemIndex);
            buyList.splice(itemIndex, 1);
        };


        service.addToBoughtList = function (itemIndex) {
            var item = {
                name: buyList[itemIndex].name,
                quantity: buyList[itemIndex].quantity
            };
            boughtList.push(item);
        };

        service.getBoughtItem = function () {
            return boughtList;
        };

    }



}());
