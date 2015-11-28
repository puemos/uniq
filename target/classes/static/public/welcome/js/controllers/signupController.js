define(function (require) {
    'use strict';
    require("AuthService");
    function signupController($scope, $location, AuthService, ngToast, ResourceService) {
        var fieldWithFocus;

        $scope.vm = {
            disableForm: false,
            errorMessages: []
        };
        $scope.focus = function (fieldName) {
            fieldWithFocus = fieldName;
        };
        $scope.blur = function (fieldName) {
            fieldWithFocus = undefined;
        };
        $scope.isMessagesVisible = function (fieldName) {
            return fieldWithFocus === fieldName || $scope.vm.submitted;
        };

        $scope.createUser = function () {
            $scope.vm.disableForm = true;
            AuthService.createUser($scope.vm).then(
                function () {
                    $location.path("/login");
                    ngToast.success(ResourceService.getMsg('create_success'));
                },
                function (code) {
                    ngToast.danger(ResourceService.getErrorMsg(code));
                })
                .finally(
                    function () {
                        $scope.vm.disableForm = false;
                    });
        }
    };

    signupController.$inject = ['$scope', '$location', 'AuthService', 'ngToast', 'ResourceService'];
    return signupController;
});