(function () {
    'use strict';
    var loginController = function ($scope, $location, UserService, $mdToast, ResourceService, ToastService, $rootScope, $mdDialog) {
        $scope.credentials = {};
        $scope.loading = false;
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.reset = function () {
            $scope.credentials = {
                username: '',
                password: '',
            };
            $scope.loginForm.$setUntouched();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        var successLogin = function () {
            $location.path('/dashboard');
            $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg('login_success')));
            $scope.hide();
        };
        var failLogin = function (code) {
            $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(code)));
        };
        var finallyLogin = function () {
            $scope.loading = false;
        };
        $scope.login = function () {
            $scope.loading = true;
            UserService.login($scope.credentials).then(successLogin, failLogin).finally(finallyLogin);
        }
        $scope.reset = function () {
            $scope.credentials = {};
        }
    };
    loginController.$inject = ['$scope', '$location', 'UserService', '$mdToast', 'ResourceService', 'ToastService', '$rootScope', '$mdDialog'];
    module.exports = loginController;
})();