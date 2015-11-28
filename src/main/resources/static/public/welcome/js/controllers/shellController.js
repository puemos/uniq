define(function (require) {
    'use strict';
    require("AuthService");
    function shellController($scope, $rootScope, $location, AuthService, ngToast, ResourceService) {
        $scope.vm = {
            currentUser: {},
            authenticate: false,
            group: false,
            state: $rootScope.$state
        };
        var markAppAsInitialized = function () {
            if ($scope.vm.appReady == undefined) {
                console.log("app ready");
                $scope.vm.appReady = true;
            }
        };
        var getCurrentUserDetails = function () {
            AuthService.getUserDetails().then(
                function (data) {
                    $scope.vm.currentUser = data;
                },
                function (msg) {
                    console.log(msg);
                    $scope.vm.authenticate = false;
                    $scope.vm.currentUser = {};
                });
        };
        var updateUserDetails = function () {
            AuthService.isLoggedIn()
                .then(
                    function () {
                        $scope.vm.authenticate = true;
                        getCurrentUserDetails();
                    },
                    function () {
                        $scope.vm.authenticate = false;
                        $scope.vm.currentUser = {};
                    })
                .finally(function () {
                    markAppAsInitialized()
                })
        };
        updateUserDetails();
        $scope.logout = function () {
            AuthService.logout()
                .then(function () {
                    $location.path("/home");
                    ngToast.success(ResourceService.getMsg('logout_success'));
                }, function (code) {
                    ngToast.danger(ResourceService.getErrorMsg(code));
                })
        };
        /*Observers*/
        $scope.$on('user:login', function (event, data) {
            updateUserDetails();
        });
        $scope.$on('user:logout', function (event, data) {
            $scope.vm.authenticate = false;
            $scope.vm.currentUser = {};
        });
    };

    shellController.$inject = ['$scope', '$rootScope', '$location', 'AuthService', 'ngToast', 'ResourceService'];
    return shellController;
})
;
