define(function (require) {
    'use strict';
    require("jquery");
    require("AuthService");
    require("GroupService");
    require("ngUiRouter");
    function dashboardController($scope, $location, $stateParams, AuthService, ngToast,
                              ResourceService, GroupService, QuestionService, $rootScope) {
        $rootScope.$broadcast('loading:start', true);
        var fieldWithFocus;
        $scope.vm = {
            disableForm: false,
            errorMessages: [],
            addQ: false,
            userQuery: ""
        };
        var updateGroupInfo = function (groupId) {
            GroupService.getGroupDetails(groupId)
                .then(
                    function (data) {
                        $scope.currentGroup = data;
                    },
                    function (msg) {
                        console.log(msg);
                    })
        };
        var getGroupQuestions = function (groupId, page, size) {
            GroupService.getGroupQuestions(groupId, page, size).then(
                function (page) {
                    $scope.currentGroup.questions = page.content;
                    $rootScope.$broadcast('loading:stop', true);
                })
        };
        if ($stateParams.groupId != null && $stateParams.groupId != undefined) {
            updateGroupInfo($stateParams.groupId);
            getGroupQuestions($stateParams.groupId, 0, 10);
        }
        $scope.createQuestion = function () {
            $scope.vm.disableForm = true;
            $scope.vm.newQ.groupId = $scope.currentGroup.id;
            QuestionService.createQuestion($scope.vm.newQ).then(
                function (msg) {
                    ngToast.success(ResourceService.getMsg(msg));
                    updateGroupInfo($scope.currentGroup.id);
                },
                function (code) {
                    ngToast.danger(ResourceService.getErrorMsg(code));
                })
                .finally(
                    function () {
                        $scope.vm.newQ = "";
                        $scope.vm.disableForm = false;
                    });
        };
    }
    dashboardController.$inject = ['$scope', '$location', '$stateParams', 'AuthService',
        'ngToast', 'ResourceService', 'GroupService',
        'QuestionService', '$rootScope'];
    return dashboardController;
});
