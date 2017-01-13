(function () {
    'use strict'

    angular
        .module("app.main")
        .controller("ModalController", ModalController);

    ModalController.$inject = ["$uibModalInstance", "clientEvents", "currentDate", "BookingData"];

    function ModalController($uibModalInstance, clientEvents, currentDate, BookingData) {
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

            if (!vm.isBookedFirstPart && vm.firstPart) {
                var from = new Date(vm.currentDate);
                var to = new Date(vm.currentDate);
                from = setDate(from, 24, 0, 0);
                to = setDate(to, 8, 0, 0);
                var booking = new BookingData();
                booking.DateFrom = from;
                booking.DateTo = to;
                
                BookingData.save(booking, function (data) {
                    console.log(data);
                });
            }
            if (!vm.isBookedSecondPart && vm.secondPart) {
                console.log("second");
                var from = new Date(vm.currentDate);
                var to = new Date(vm.currentDate);
                from = setDate(from, 8, 0, 0);
                to = setDate(to, 16, 0, 0);
                var booking = new BookingData();
                booking.DateFrom = from;
                booking.DateTo = to;

                BookingData.save(booking, function (data) {
                    console.log(data);
                });
            }
            if (!vm.isBookedThirdPart && vm.thirdPart) {
                var from = new Date(vm.currentDate);
                var to = new Date(vm.currentDate);
                from = setDate(from, 16, 0, 0);
                to = setDate(to, 24, 0, 0);

                var booking = new BookingData();
                booking.DateFrom = from;
                booking.DateTo = to;

                BookingData.save(booking, function (data) {
                    console.log(data);
                });
            }
            $uibModalInstance.close(vm.firstPart, vm.secondPart, vm.thirdPart);
        }

        function close() {
            $uibModalInstance.dismiss();
        }

        // private functions 
        function setDate(date, hours, minutes, seconds) {
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(seconds);

            return date;
        }
    }
})()