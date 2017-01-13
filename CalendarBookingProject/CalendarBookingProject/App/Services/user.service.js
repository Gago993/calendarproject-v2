(function () {
    'use strict';

    angular.module('app.service')
        .factory('CurrentUser', CurrentUser);

    CurrentUser.$inject = ["$q", "UserData"];

    function CurrentUser($q, UserData) {

        var user;

        var service = {
            getUser: getUser
        };

        return service;
        ////////////////////////////////////

        function getUser() {
            if (user) {
                return $q.when(user);
            }
            else {
                return UserData.getLoggedInUser(function (data) {
                    user = data;
                });
            }
        }
    }
})();