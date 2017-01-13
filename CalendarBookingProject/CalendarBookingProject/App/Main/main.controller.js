(function () {
    'use strict'

    angular
        .module("app.main")
        .controller("MainController", MainController);

    MainController.$inject = ["$scope", "$compile", "$uibModal", "BookingData", "Color", "UserData", "uiCalendarConfig"];

    function MainController($scope, $compile, $uibModal, BookingData, Color, UserData, uiCalendarConfig) {
        var vm = this;
        vm.events = [];
        vm.user = UserData.getLoggedInUser();

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
                views: {
                    custom: {
                        type: 'month',
                        duration: { weeks: 5 },
                    }
                },
                dayClick: onDayClick,
                events: events,
                dayRender: onDayRender,
                eventRender: onEventRender
            }
        }

        function onEventRender(event, element) {
            element.find(".fc-event-title").remove();
            element.find(".fc-event-time").remove();
            element.find(".fc-content").remove();
            var templateBtn = "";

            if (vm.user.UserID == event.UserID) {
                templateBtn = '<span id="remove" style="float:right; width:15px; text-align:center; background-color:black; border-radius: 999px; opacity:0.4; cursor:pointer">&#10006</span>';
            }

            var new_description = "<div><span>" + moment(event.start).format("HH:mm") + '-' + moment(event.end).format("HH:mm") + templateBtn + '</span></div>';
            element.append(new_description);

            element.find("#remove").on('click', function (e) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    templateUrl: "App/Modal/confirm.modal.html",
                    controller: "ConfirmModalController",
                    controllerAs: "vm",
                });

                modalInstance.result.then(function () {
                    BookingData.remove({ id: event.id }, function (booking) {
                        var calendar = uiCalendarConfig.calendars.bookings_calendar;
                        vm.user.CurrentBookingsCount--;
                        calendar.fullCalendar('removeEvents', [booking.ID]);
                    });
                }, function () {
                    console.log("canceled");
                });
            });
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
            maxDate.setDate(maxDate.getDate() - 1);
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
                templateUrl: "App/Modal/modal.html",
                controller: "ModalController",
                controllerAs: "vm",
                resolve: {
                    clientEvents: function () {
                        return clientEvents;
                    },
                    currentDate: function () {
                        return currentDate;
                    },
                    user: function(){
                        return angular.copy(vm.user);
                    }
                },
            });

            modalInstance.result.then(function (data) {
                if (data) {
                    var calendar = uiCalendarConfig.calendars.bookings_calendar;
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i]) {
                            var obj = {};
                            obj.start = data[i].DateFrom;
                            obj.end = data[i].DateTo;
                            obj.UserID = data[i].UserID;
                            obj.id = data[i].ID;
                            obj.color = Color.getUsersColor(obj.UserID);
                            vm.user.CurrentBookingsCount++;
                            calendar.fullCalendar('renderEvent', obj);
                        }
                    }
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
                    obj.start = data[i].DateFrom;
                    obj.end = data[i].DateTo;
                    obj.UserID = data[i].UserID;
                    obj.id = data[i].ID;
                    obj.color = Color.getUsersColor(obj.UserID);
                    response.push(obj);
                }
                console.log(response);
                callback(response);
            });
        }
    }
})()