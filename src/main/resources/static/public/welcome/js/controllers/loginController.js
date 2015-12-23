define(function (require) {
    'use strict';
    require("AuthService");
    function loginController($scope, $location, AuthService, $mdToast, ResourceService,$rootScope) {
        $scope.credentials = {};
        function createSimpleToast(text) {
            return $mdToast.simple()
                .content(text)
                .hideDelay(3000)
        }

        var successLogin = function () {
            $location.path("/userGroups");
            $mdToast.show(
                createSimpleToast(ResourceService.getMsg('login_success'))
            );
        };
        var failLogin = function (code) {
            $mdToast.show(
                createSimpleToast(ResourceService.getErrorMsg(code))
            );
        };
        var finallyLogin = function () {
            $rootScope.$broadcast('loading:stop', true);
        };
        $scope.login = function () {
            $rootScope.$broadcast('loading:start', true);
            AuthService.login($scope.credentials).then(successLogin, failLogin).finally(finallyLogin);
        }
        $scope.reset = function () {
            $scope.credentials = {};
        }
    };
    loginController.$inject = ['$scope', '$location', 'AuthService', '$mdToast', 'ResourceService', '$rootScope'];
    return loginController;
});