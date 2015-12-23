define(function (require) {
    'use strict';
    require("AuthService");
    require("ngMaterial");
    function shellController($scope, $rootScope, $location, AuthService,
                             ngToast, ResourceService, $mdSidenav, $state) {
        var self = this;
        $scope.menu = [
            {
                link: 'home',
                title: 'Dashboard',
                icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
            },
            {
                link: 'userGroups',
                title: 'Groups',
                icon: 'social:ic_group_24px'
            },
            {
                link: 'home',
                title: 'Messages',
                icon: 'communication:ic_message_24px'
            }
        ];
        $scope.admin = [
            {
                link: '',
                title: 'Trash',
                icon: 'action:ic_delete_24px'
            },
            {
                link: 'showListBottomSheet($event)',
                title: 'Settings',
                icon: 'action:ic_settings_24px'
            }
        ];
        $scope.vm = {
            currentUser: {},
            authenticate: false,
            group: false,
            state: $rootScope.$state,
            userMenu: {}
        };
        $scope.goRoute = $state.go;
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
        // Toolbar search toggle
        $scope.toggleSearch = function (element) {
            $scope.showSearch = !$scope.showSearch;
        };
        // Sidenav toggle
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
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
        $scope.$on('loading:start', function (event, data) {
            self.loading = true;
        });
        $scope.$on('loading:stop', function (event, data) {
            self.loading = false;
        });
        $scope.$on('user:login', function (event, data) {
            updateUserDetails();
        });
        $scope.$on('user:logout', function (event, data) {
            $scope.vm.authenticate = false;
            $scope.vm.currentUser = {};
        });
    };
    shellController.$inject = ['$scope', '$rootScope', '$location', 'AuthService',
        'ngToast', 'ResourceService', '$mdSidenav', '$state'];
    return shellController;
})
;
