define(function (require) {
    'use strict';
    function loginController($scope,$location,AuthService,cfpLoadingBar,ngToast,ResourceService) {
        function successLogin() {
            cfpLoadingBar.complete();
            $scope.disableForm = false;
            $location.path("/home");
            ngToast.success(ResourceService.getMsg('login_success'));
        }

        function failLogin(code) {
            cfpLoadingBar.complete();
            $scope.disableForm = false;
            ngToast.danger(ResourceService.getErrorMsg(code));
        }

        $scope.credentials = {};
        $scope.login = function () {
            $scope.disableForm = true;
            cfpLoadingBar.start();
            AuthService.login($scope.credentials).then(successLogin, failLogin);
        }
    }
    loginController.$inject = ['$scope','$location','AuthService','cfpLoadingBar','ngToast','ResourceService'];
    return loginController;
});