define(function (require) {
    'use strict';
    require("jquery");
    require("AuthService");
    require("GroupService");
    require("ngModalService");
    require("ngUiRouter");
    function groupsController($scope, $stateParams, AuthService, ngToast,
                              ResourceService, GroupService, QuestionService,
                              ModalService) {
        var fieldWithFocus;
        $scope.vm = {
            disableForm: false,
            errorMessages: [],
            addQ: false,
            userQuery: ""
        };
        if ($stateParams.groupId != null && $stateParams.groupId != undefined){
            updateGroupInfo($stateParams.groupId);
        }
        var updateUserInfo = function () {
            AuthService.getUserDetails()
                .then(
                    function (data) {
                        $scope.currentUser = data;
                    },
                    function (msg) {
                        console.log(msg);
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
        updateUserInfo();
        $scope.gotoGroup = function (groupId) {
            $scope.getGroupDetails(groupId);
            $state.go('group');
        };
        $scope.createGroup = function () {
            $scope.vm.disableForm = true;
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
        $scope.getQuestionDetails = function (groupId) {
            QuestionService.getQuestionDetails(groupId).then(
                function (question) {
                    $scope.currentQuestion = question;
                })
        };
        $scope.searchUsers = function(query){
            AuthService.searchUsers(query).then(
                function(data){
                    $scope.vm.userQuery = "";
                    $scope.searchUsersResult = data;
                },
                function(msg){
                    console.log(msg);
                    $scope.vm.userQuery = "";
                });
        };
        $scope.showUserInfo = function(user) {
            ModalService.showModal({
                templateUrl: "/public/welcome/views/modals/userInfo.html",
                controller: "userInfoModalController",
                inputs: {
                    user: user
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function() {
                });
            });

        };
        $scope.showGroupInfo = function(groupId) {
            GroupService.getGroupDetails(groupId).then(
                function (group) {
                    openModal(group);
                })
            function openModal(group) {
                ModalService.showModal({
                    templateUrl: "/public/welcome/views/modals/groupInfo.html",
                    controller: "groupInfoModalController",
                    inputs: {
                        group: group
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.close.then(function () {
                    });
                });
            }


        };
    };

    groupsController.$inject = ['$scope', '$stateParams', 'AuthService',
                                'ngToast', 'ResourceService', 'GroupService',
                                'QuestionService' ,'ModalService'];
    return groupsController;
});
