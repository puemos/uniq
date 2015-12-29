define(function (require) {
    'use strict';
    require("GroupService");
    function newQuestionController($scope, $mdToast, ResourceService,ToastService, $mdDialog, $rootScope, UserService, QuestionService, $location) {
        $scope.currentUser = {};
        $scope.loading = true;

        (function () {
            UserService.getUserDetails()
                .then(
                    function (data) {
                        $scope.currentUser = data;
                    },
                    function (msg) {
                        console.log(msg);
                    })
                .finally(
                    function () {
                        $scope.loading = false;
                    });
        })();
        $scope.question = {};
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.reset = function () {
            $scope.newQuestionForm.$setUntouched();
            $scope.question = {};
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        $scope.createQuestion = function (question) {
            $scope.loading = true;
            QuestionService.createQuestion(question).then(
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
    newQuestionController.$inject = ['$scope', '$mdToast', 'ResourceService','ToastService', '$mdDialog',
        '$rootScope', 'UserService', 'QuestionService', '$location'];
    return newQuestionController;
});