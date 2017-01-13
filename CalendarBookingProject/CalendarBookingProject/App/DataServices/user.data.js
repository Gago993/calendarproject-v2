(function () {
    'use strict';

    angular
    .module("app.data")
    .factory('UserData', UserData);

    UserData.$inject = ['$resource'];

    function UserData($resource) {
        return $resource("/api/users/:id", {}, {
            getLoggedInUser: {
                method: "GET",
                url: "/api/users/user"
            }
        });
    }
})();