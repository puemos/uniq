define(function (require) {
    'use strict';
    require("jquery");
    require("AuthService");
    require("GroupService");
    require("ngUiRouter");
    function dashboardController($scope, $location, AuthService, ngToast,
                                 ResourceService, GroupService, $rootScope) {
        $rootScope.$broadcast('loading:start', true);
        $scope.gotoGroup = function (groupId) {
            $location.path("/groupinfo/" + groupId);
        };
        $scope.vm = {
            disableForm: false,
            errorMessages: [],
            addQ: false,
            userQuery: ""
        };
        var updateUserInfo = function () {
            AuthService.getUserDetails()
                .then(
                    function (data) {
                        $scope.currentUser = data;
                    },
                    function (msg) {
                        console.log(msg);
                    })
                .finally(
                    function () {
                        $rootScope.$broadcast('loading:stop', true);
                    })
        };
        updateUserInfo();
        $scope.createGroup = function () {
            $scope.vm.disableForm = true;
            $rootScope.$broadcast('loading:start', true);
            GroupService.createGroup($scope.vm.newGroupTitle).then(
                function (msg) {
                    ngToast.success(ResourceService.getMsg(msg));
                    updateUserInfo();
                },
                function (code) {
                    ngToast.danger(ResourceService.getErrorMsg(code));
                })
                .finally(
                    function () {
                        $scope.vm.newGroupTitle = "";
                        $scope.vm.disableForm = false;
                        $rootScope.$broadcast('loading:stop', true);
                    });
        };
    };
    dashboardController.$inject = ['$scope', '$location', 'AuthService',
        'ngToast', 'ResourceService', 'GroupService',
        '$rootScope'];
    return dashboardController;
});
