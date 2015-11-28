define(function (require) {
    'use strict';
    function homeController($scope, AuthService, isLoggedIn) {
        $scope.isLoggedIn = isLoggedIn;
        if (isLoggedIn) {
            $scope.currentUser = AuthService.getCurrentUser().user;
        }
    }
    homeController.$inject = ['$scope', 'AuthService', 'isLoggedIn'];
    return homeController;
});
