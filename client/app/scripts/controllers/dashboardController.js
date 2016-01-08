(function () {
    'use strict';
    var dashboardController = function ($scope, $location, UserService, GroupService, ResourceService, ToastService, $rootScope, $mdToast) {
        $scope.vm = {
            errorMessages: [],
            emptyGroups: true,
            groups_loading: true,
            questions_loading: true
        };
        $rootScope.$broadcast('loading:start', true);
        $scope.gotoGroup = function (groupId) {
            $location.path('/g/' + groupId);
        };
        $scope.deleteGroup = function (groupId) {
            $rootScope.$broadcast('loading:start', true);
            GroupService.deleteGroup(groupId).then(
                function () {
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
                        $scope.vm.groups_loading = false;
                        $rootScope.$broadcast('loading:stop', true);
                    });
            UserService.getUserQuestions(0, 10).then(
                function (page) {
                    $scope.currentUser.questions = page.content;
                    $scope.vm.questions_loading = false;
                    $rootScope.$broadcast('loading:stop', true);
                });
        };
        updateUserInfo();
        $scope.$on('group:change', function () {
            updateUserInfo();
        });
        $scope.$on('user:login', function () {
            updateUserInfo();
        });
    };
    dashboardController.$inject = ['$scope', '$location', 'UserService', 'GroupService',
        'ResourceService', 'ToastService', '$rootScope', '$mdToast'];
    module.exports = dashboardController;
})();
