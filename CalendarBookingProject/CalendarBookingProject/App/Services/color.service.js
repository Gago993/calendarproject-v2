(function () {
    'use strict';

    angular.module('app.service')
        .factory('Color', Color);

    Color.$inject = [];

    function Color() {
        
        var userColorMappings = {};

        var service = {
            getMyColor: getMyColor,
            getUsersColor: getUsersColor
        };

        return service;
        ////////////////////////////////////
        function getMyColor(){
            return "blue";
        }

        function getUsersColor(userId) {

            if (!angular.isUndefined(userColorMappings[userId]) && userColorMappings[userId] != null) {
                return userColorMappings[userId];
            } else {
                var color = getRandomColor();
                userColorMappings[userId] = color;
                return color;
            }
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

    }
})();