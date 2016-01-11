(function () {
    'use strict';
    var dashboardController = function ($scope, $location, UserService, GroupService, ResourceService, ToastService, $rootScope, $mdToast, $state) {
        $scope.pagingQ = {
            perPage: 5,
            pageNum: 0,
            totalPages: null
        };
        $scope.vm = {
            errorMessages: [],
            emptyGroups: true,
            groups_loading: true,
            questions_loading: true
        };
        $scope.currentUser = {};
        $rootScope.$broadcast('loading:start', true);
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
        };
        var getUserQuestion = function (dir) {
            $scope.vm.questions_loading = true;
            var pageNum;
            if (dir === 'next') {
                pageNum = ($scope.pagingQ.pageNum + 1);
            } else if (dir === 'prev') {
                pageNum = ($scope.pagingQ.pageNum - 1);
            } else {
                pageNum = $scope.pagingQ.pageNum;
            }
            UserService.getUserQuestions(pageNum, $scope.pagingQ.perPage).then(
                function (page) {
                    $scope.currentUser.questions = page.content;
                    $scope.pagingQ.totalPages = page.totalPages;
                    $scope.pagingQ.pageNum = page.number;
                    $scope.vm.questions_loading = false;
                    $rootScope.$broadcast('loading:stop', true);
                }).then(function (err) {
                console.log(err)
            });
        };
        (function init() {
            updateUserInfo();
            getUserQuestion();
        })();
        $scope.gotoGroup = function (groupId) {
            $state.go('group', {groupId: groupId});

        };
        $scope.gotoQuestion = function (question) {
            $state.go('question', {question: question});
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
        $scope.moveUserQuestion = getUserQuestion;
        $scope.$on('group:change', function () {
            updateUserInfo();
        });
        $scope.$on('user:login', function () {
            updateUserInfo();
        });
    };
    dashboardController.$inject = ['$scope', '$location', 'UserService', 'GroupService',
        'ResourceService', 'ToastService', '$rootScope', '$mdToast', '$state'];
    module.exports = dashboardController;
})();
