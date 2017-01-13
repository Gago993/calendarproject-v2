(function () {
    'use strict'

    angular
        .module("app.modal")
        .controller("ConfirmModalController", ConfirmModalController);

    ConfirmModalController.$inject = ["$uibModalInstance"];

    function ConfirmModalController($uibModalInstance) {
        var vm = this;

        vm.save = save;
        vm.close = close;

        function save() {
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss();
        }
    }
})()