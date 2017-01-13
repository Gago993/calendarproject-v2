(function () {
    'use strict'

    angular
        .module("app.modal")
        .controller("ModalController", ModalController);

    ModalController.$inject = ["$uibModalInstance", "$q", "clientEvents", "currentDate", "BookingData", "user"];

    function ModalController($uibModalInstance, $q, clientEvents, currentDate, BookingData, user) {
        var vm = this;
        vm.isBookedFirstPart = false;
        vm.isBookedSecondPart = false;
        vm.isBookedThirdPart = false;
        vm.firstPart;
        vm.secondPart;
        vm.thirdPart;
        vm.firstPartTime;
        vm.secondPartTime;
        vm.thirdPartTime;
        vm.currentDate = currentDate;
        vm.save = save;
        vm.close = close;
        console.log(user);

        for (var i = 0; i < clientEvents.length; i++) {
            var hour = moment(clientEvents[i].start).format("HH");

            if (hour == '00') {
                vm.isBookedFirstPart = true;
                vm.firstPartTime = clientEvents[i];
            }
            else if ( hour == '08') {
                vm.isBookedSecondPart = true;
                vm.secondPartTime = clientEvents[i];
            }
            else if ( hour == '16') {
                vm.isBookedThirdPart = true;
                vm.thirdPartTime = clientEvents[i];
            }
        }

        function save() {
            var firstDefer = $q.defer();
            var secondDefer = $q.defer();
            var thirdDefer = $q.defer();

            if (!vm.isBookedFirstPart && vm.firstPart) {
                var from = moment(vm.currentDate).set({ hour: 24 }).format();
                var to = moment(vm.currentDate).set({ hour: 8 }).format();

                var booking = new BookingData();
                booking.DateFrom = from;
                booking.DateTo = to;
                
                BookingData.save(booking, function (data) {
                    firstDefer.resolve(data);
                });
            } else { firstDefer.resolve(null); }

            if (!vm.isBookedSecondPart && vm.secondPart) {
                var from = moment(vm.currentDate).set({ hour: 8 }).format();
                var to = moment(vm.currentDate).set({ hour: 16 }).format();

                var booking = new BookingData();
                booking.DateFrom = from;
                booking.DateTo = to;

                BookingData.save(booking, function (data) {
                    secondDefer.resolve(data);
                });
            } else { secondDefer.resolve(null); }

            if (!vm.isBookedThirdPart && vm.thirdPart) {
                var from = moment(vm.currentDate).set({ hour: 16 }).format();
                var to = moment(vm.currentDate).set({ hour: 23 }).format();

                var booking = new BookingData();
                booking.DateFrom = from;
                booking.DateTo = to;
                
                BookingData.save(booking, function (data) {
                    thirdDefer.resolve(data);
                });
            } else { thirdDefer.resolve(null); }

            $q.all([firstDefer.promise, secondDefer.promise, thirdDefer.promise]).then(function (values) {
                $uibModalInstance.close(values);
            });
        }

        function close() {
            $uibModalInstance.dismiss();
        }
    }
})()