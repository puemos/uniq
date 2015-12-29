define(function (require) {
    'use strict';
    require("jquery");
    require("UserService");
    require("GroupService");
    require("ngUiRouter");
    function dashboardController($scope, $location, $stateParams, $mdToast,
                                 ResourceService, ToastService, GroupService, QuestionService, $rootScope) {
        $rootScope.$broadcast('loading:start', true);
        function backToDashboard() {
            $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg('empty_group')));
            $location.path('/dashboard');
        }


        if ($stateParams.groupId == null || $stateParams.groupId == undefined) {
            backToDashboard();
        }
        $scope.vm = {
            errorMessages: [],
            emptyQuestions: true
        };
        var updateGroupInfo = function () {
            GroupService.getGroupDetails($stateParams.groupId)
                .then(
                    function (data) {
                        $scope.currentGroup = data;
                        if (data.questions.length) {
                            $scope.vm.emptyQuestions = false;
                        }
                        getGroupQuestions($stateParams.groupId, 0, 10);
                    },
                    function (msg) {
                        console.log(msg);
                        backToDashboard();
                    })
        };
        var getGroupQuestions = function (groupId, page, size) {
            GroupService.getGroupQuestions(groupId, page, size).then(
                function (page) {
                    $scope.currentGroup.questions = page.content;
                    $rootScope.$broadcast('loading:stop', true);
                })
        };
        updateGroupInfo();
        $scope.createQuestion = function () {
            $scope.vm.disableForm = true;
            $scope.vm.newQ.groupId = $scope.currentGroup.id;
            QuestionService.createQuestion($scope.vm.newQ).then(
                function (msg) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg(msg)));
                },
                function (code) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(code)));
                })
                .finally(
                    function () {
                        $scope.vm.newQ = "";
                        $scope.vm.disableForm = false;
                    });
        };
        $scope.deleteQuestion = function (questionId) {
            $rootScope.$broadcast('loading:start', true);
            QuestionService.deleteQuestion(questionId).then(
                function (res) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg('question_deleted')));
                },
                function (err) {
                    $rootScope.$broadcast('loading:stop', true);
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(err)));
                });
        };
        $scope.$on('question:change', function (event, data) {
            updateGroupInfo();
        })
    }

    dashboardController.$inject = ['$scope', '$location', '$stateParams',
        '$mdToast', 'ResourceService', 'ToastService', 'GroupService',
        'QuestionService', '$rootScope'];
    return dashboardController;
});
