define(function (require) {
    'use strict';
    require("AuthService");
    function loginController($scope, $location, AuthService, ngToast, ResourceService) {
        var successLogin = function () {
            $location.path("/userGroups");
            ngToast.success(ResourceService.getMsg('login_success'));
        };
        var failLogin = function (code) {
            ngToast.danger(ResourceService.getErrorMsg(code));
        };
        var finallyLogin = function () {
            $scope.disableForm = false;
        };

        $scope.credentials = {};
        $scope.login = function () {
            $scope.disableForm = true;
            AuthService.login($scope.credentials).then(successLogin, failLogin).finally(finallyLogin);
        }
    };

    loginController.$inject = ['$scope', '$location', 'AuthService', 'ngToast', 'ResourceService'];
    return loginController;
});