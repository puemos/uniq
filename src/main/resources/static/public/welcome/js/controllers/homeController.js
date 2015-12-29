define(function (require) {
    'use strict';
    require("UserService");
    function homeController($scope, UserService) {

    };

    homeController.$inject = ['$scope', 'UserService'];
    return homeController;
});
