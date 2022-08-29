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
            try {
                ShoppingListCheckOffService.removeItem(itemIndex);
            } catch (error) {
                buyCtrl.listEmpty = error.message;
            }
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtCtrl = this;
        boughtCtrl.listEmpty = "Nothing bought yet.";
        boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtItem();
        boughtCtrl.updateMsg =function () {
            boughtCtrl.listEmpty = "";
        }
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
            // record the index and add to boughtList
            service.addToBoughtList(itemIndex);
            // remove index row from buyList
            buyList.splice(itemIndex, 1);
            // check if buyList length is 0
            service.buyListLenCheck();
            service.getBoughtItem();
        };

        service.buyListLenCheck = function () {
            if (buyList.length == 0) {
                throw new Error("Everything is bought!");
            }
        }

        service.addToBoughtList = function (itemIndex) {
            var item = {
                name: buyList[itemIndex].name,
                quantity: buyList[itemIndex].quantity
            };
            boughtList.push(item);
            return boughtList;
        };

        service.getBoughtItem = function () {
            return boughtList;
        };

    }



}());
