(function () {
    'use strict'

    angular
        .module("app.main")
        .controller("MainController", MainController);

    MainController.$inject = ["$uibModal", "BookingData", "Color"];

    function MainController($uibModal, BookingData, Color) {
        var vm = this;
        vm.events = [];

        vm.calendar = {
            calendar: {
                theme: true,
                height: 550,
                allDayText: '',
                defaultView: 'custom',
                fixedWeekCount: false,
                eventStartEditable: false,
                editable: true,
                header: {
                    left: 'title',
                },
                dayClick: onDayClick,
                views: {
                    custom: {
                        type: 'month',
                        duration: { weeks: 5 },
                    }
                },
                events: events,
                dayRender: onDayRender 
            }
        }

        function onDayRender(date, cell) {
            var maxDate = new Date();
            var currentMonth = maxDate.getMonth();
            var month = (moment(date).get('month'));

            if (date < maxDate) {
                $(cell).addClass('fc-state-disabled');
            }

            if (month > currentMonth) {
                $(cell).addClass('fc-state-disabled');
            }

        }

        function onDayClick(date, jsEvent, view) {
            var clientEvents = $('#calendar').fullCalendar('clientEvents', function (event) {
                if (moment(date).format('YYYY-MM-DD') == moment(event._start).format('YYYY-MM-DD')) {
                    return true;
                }
                return false;
            });

            var currentDate = date;
            var maxDate = new Date();
            var currentMonth = maxDate.getMonth();
            var month = (moment(date).get('month'));

            if (date < maxDate) {
                return;
            }

            if (month > currentMonth) {
                return;
            }

            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: "App/Main/modal.html",
                controller: "ModalController",
                controllerAs: "vm",
                resolve: {
                    clientEvents: function () {
                        return clientEvents;
                    },
                    currentDate: function () {
                        return currentDate;
                    }
                },
            });

            modalInstance.result.then(function (data) {
                if (data) {
                    console.log(data);
                }
            }, function () {
                console.log("canceled");
            });
        }

        function events(start, end, timezone, callback) {
            BookingData.getBookings(function (data) {
                var response = []
                for (var i = 0; i < data.length; i++) {
                    var obj = {};
                    obj.title = "booked";
                    obj.start = data[i].DateFrom;
                    obj.end = data[i].DateTo;
                    obj.UserID = data[i].UserID;
                    obj.color = Color.getUsersColor(obj.UserID);
                    response.push(obj);
                }
                console.log(response);
                callback(response);
            });
        }
    }
})()