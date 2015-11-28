define(function (require) {
    'use strict';
    require("AuthService");
    function homeController($scope, AuthService) {

    };

    homeController.$inject = ['$scope', 'AuthService'];
    return homeController;
});
