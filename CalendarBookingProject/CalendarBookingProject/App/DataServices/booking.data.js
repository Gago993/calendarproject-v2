(function () {
    'use strict';

    angular
    .module("app.data")
    .factory('BookingData', BookingData);

    BookingData.$inject = ['$resource'];

    function BookingData($resource) {
        return $resource("/api/bookings/:id", {}, {
            getBookings: {
                method: "GET",
                url: "/api/bookings",
                isArray: true
            }
        });
    }
})();