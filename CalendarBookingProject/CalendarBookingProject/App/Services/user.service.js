(function () {
    'use strict';

    angular.module('app.service')
        .factory('CurrentUser', CurrentUser);

    CurrentUser.$inject = ["UserData"];

    function CurrentUser(UserData) {

        var service = {
            getUser: getUser
        };

        return service;
        ////////////////////////////////////

        function getUser() {
            return UserData.getLoggedInUser(function (data) {
                console.log(data);
            });
        }
    }
})();