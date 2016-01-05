(function () {
    'use strict';
    var QuestionController = function ($scope, $mdToast, ResourceService, ToastService, $mdDialog, QuestionService, data) {
        $scope.loading = false;
        $scope.question = data;
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
        $scope.createAnswer = function (question) {
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
    QuestionController.$inject = ['$scope', '$mdToast', 'ResourceService', 'ToastService', '$mdDialog', 'QuestionService', 'data'];
    module.exports = QuestionController;
})();