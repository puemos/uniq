define(function (require) {
    'use strict';
    require('./../services/AuthService');
    function shellController($scope, $location, AuthService, cfpLoadingBar, ngToast, ResourceService) {
        AuthService.isLoggedIn()
        $scope.AuthService = AuthService;
        $scope.logout = function () {
            cfpLoadingBar.start();
            AuthService.logout()
                .then(function () {
                    cfpLoadingBar.complete();
                    $location.path("/home");
                    ngToast.success(ResourceService.getMsg('logout_success'));
                }, function (code) {
                    cfpLoadingBar.complete();
                    ngToast.danger(ResourceService.getErrorMsg(code));
                })
        };
    }
    shellController.$inject = ['$scope', '$location', 'AuthService', 'cfpLoadingBar', 'ngToast', 'ResourceService'];
    return shellController;
});
