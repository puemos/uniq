define(function (require) {
    'use strict';
    require("UserService");
    function newUserController($scope, $location, UserService, $mdToast, ResourceService,ToastService, $mdDialog, $rootScope) {
        $scope.loading = false;
        $scope.vm = {
            errorMessages: []
        };
        $scope.user = {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            firstname: "",
            lastname: ""
        };
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.reset = function () {
            $scope.user = {
                username: "",
                email: "",
                password: "",
                passwordConfirm: "",
                firstname: "",
                lastname: ""
            };
            $scope.newUserForm.$setUntouched();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        $scope.createUser = function (user) {
            $scope.loading = true;
            UserService.createUser(user).then(
                function () {
                    $location.path("/home");
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg('create_success')));
                    $scope.hide();
                },
                function (code) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(code)));
                })
                .finally(
                    function () {
                        $scope.loading = false;
                    });
        }
    };
    newUserController.$inject = ['$scope', '$location', 'UserService', '$mdToast',
        'ResourceService','ToastService', '$mdDialog', '$rootScope'];
    return newUserController;
});