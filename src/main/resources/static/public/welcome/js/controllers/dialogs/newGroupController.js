define(function (require) {
    'use strict';
    require("GroupService");
    function newGroupController($scope, $mdToast, ResourceService,ToastService, $mdDialog, $rootScope, GroupService, $location) {

        $scope.loading = false;
        $scope.group = {};
        $scope.users = [
            {
                username: "shy",
                id: "1234"
            },
            {
                username: "alter",
                id: "4321"
            }
        ];
        $scope.admins = [
            {
                username: "shy",
                id: "1234"
            },
            {
                username: "alter",
                id: "4321"
            }
        ];
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.reset = function () {
            $scope.newGroupForm.$setUntouched();
            $scope.group = {};
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        $scope.createGroup = function (group, users) {
            $scope.loading = true;
            var usersMap = {};
            users.map(function(user){
                usersMap[user.id] = user.username;
            })
            group.users = usersMap;
            GroupService.createGroup(group).then(
                function (msg) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg(msg)));
                    $scope.hide();
                },
                function (code) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(code)));
                })
                .finally(
                    function () {
                        $scope.loading = false;
                        $mdDialog.hide();
                    });
        };
    };
    newGroupController.$inject = ['$scope', '$mdToast', 'ResourceService','ToastService', '$mdDialog',
        '$rootScope', 'GroupService', '$location'];
    return newGroupController;
});