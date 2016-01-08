(function () {
    'use strict';
    var QuestionController = function ($scope, $rootScope, $stateParams,$mdToast, ResourceService, ToastService, QuestionService) {
        function backToDashboard() {
            $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg('empty_question')));
            $location.path('/dashboard');
        }

        if ($stateParams.question === null || $stateParams.question === undefined) {
            backToDashboard();
        }else{
            $scope.question = $stateParams.question;
        }

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
    QuestionController.$inject = ['$scope', '$rootScope', '$stateParams','$mdToast', 'ResourceService', 'ToastService', 'QuestionService'];
    module.exports = QuestionController;
})();