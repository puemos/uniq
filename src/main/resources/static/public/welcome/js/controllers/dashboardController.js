define(function (require) {
    'use strict';
    require("UserService");
    require("GroupService");
    require("ngUiRouter");
    function dashboardController($scope, $location, UserService, GroupService, ResourceService, ToastService, $rootScope, $mdToast) {
        $scope.vm = {
            errorMessages: [],
            emptyGroups: true
        };
        $rootScope.$broadcast('loading:start', true);
        $scope.gotoGroup = function (groupId) {
            $location.path("/groupinfo/" + groupId);
        };
        $scope.deleteGroup = function (groupId) {
            $rootScope.$broadcast('loading:start', true);
            GroupService.deleteGroup(groupId).then(
                function (res) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg('group_deleted')));
                },
                function (err) {
                    $rootScope.$broadcast('loading:stop', true);
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(err)));
                });
        };
        var updateUserInfo = function () {
            UserService.getUserDetails()
                .then(
                    function (data) {
                        if (Object.keys(data.groups).length) {
                            $scope.vm.emptyGroups = false;
                        }
                        $scope.currentUser = data;
                    },
                    function (msg) {
                        console.log(msg);
                    })
                .finally(
                    function () {
                        $rootScope.$broadcast('loading:stop', true);
                    });
            UserService.getUserQuestions(0, 10);
        };
        updateUserInfo();
        $scope.$on('group:change', function (event, data) {
            updateUserInfo();
        });
        $scope.$on('user:login', function (event, data) {
            updateUserInfo();
        });
    }

    dashboardController.$inject = ['$scope', '$location', 'UserService', 'GroupService', 'ResourceService', 'ToastService', '$rootScope', '$mdToast'];
    return dashboardController;
});
