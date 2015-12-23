define(function (require) {
    'use strict';
    require("jquery");
    require("AuthService");
    require("GroupService");
    require("ngUiRouter");
    function groupsController($scope, $location, $stateParams, AuthService, ngToast,
                              ResourceService, GroupService, QuestionService, $rootScope) {
        $rootScope.$broadcast('loading:start', true);
        $scope.gotoGroup = function (groupId) {
            $location.path("/groupinfo/" + groupId);
        };
        var fieldWithFocus;
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
        }else{
            updateUserInfo();
        }
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
        $scope.showUserInfo = function (user) {
        };
        $scope.showGroupInfo = function (groupId) {
            GroupService.getGroupDetails(groupId).then(
                function (group) {
                })
        };
    };
    groupsController.$inject = ['$scope', '$location', '$stateParams', 'AuthService',
        'ngToast', 'ResourceService', 'GroupService',
        'QuestionService', '$rootScope'];
    return groupsController;
});
