(function () {
    'use strict';
    var shellController = function ($scope, $rootScope, $location, UserService,
                                    $mdToast, ResourceService, ToastService, $mdSidenav, $state, $mdMedia, $mdDialog) {
        var self = this;
        $scope.menu = [
            {
                link: 'home',
                title: 'Home',
                icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
            },
            {
                link: 'dashboard',
                title: 'Dashboard',
                icon: 'social:ic_group_24px'
            },
            {
                link: 'about',
                title: 'About Us',
                icon: 'communication:ic_message_24px'
            }
        ];
        $scope.admin = [
            {
                link: 'showListBottomSheet($event)',
                title: 'Settings',
                icon: 'action:ic_settings_24px'
            }
        ];
        $scope.vm = {
            authenticate: false,
            group: false,
            state: $rootScope.$state,
            userMenu: {}
        };
        $scope.goRoute = $state.go;
        var markAppAsInitialized = function () {
            if ($scope.vm.appReady == undefined) {
                console.log('app ready');
                $scope.vm.appReady = true;
            }
        };
        var getCurrentUserDetails = function () {
            UserService.getUserDetails().then(
                function (data) {
                    self.currentUser = data;
                },
                function (msg) {
                    console.log(msg);
                    $scope.vm.authenticate = false;
                    $scope.vm.currentUser = {};
                });
        };
        var updateUserDetails = function () {
            UserService.isLoggedIn()
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
            UserService.logout()
                .then(function () {
                    $location.path('/home');
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getMsg('logout_success')));
                }, function (code) {
                    $mdToast.show(ToastService.createSimpleToast(ResourceService.getErrorMsg(code)));
                })
        };
        self.showDialog = function (ev, dialogName, data) {
            var config = {
                controller: dialogName + 'Controller',
                templateUrl: '/public/dist/views/dialogs/' + dialogName + '.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            };
            if (data) {
                config.locals = {data: data};
            }
            $mdDialog.show(config)
                .then(function (answer) {
                }, function () {
                });
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
        $scope.$on('user:created', function (event, data) {
            updateUserDetails();
        });
        $scope.$on('user:logout', function (event, data) {
            $scope.vm.authenticate = false;
            $scope.vm.currentUser = {};
        });
    };
    shellController.$inject = ['$scope', '$rootScope', '$location', 'UserService',
        '$mdToast', 'ResourceService', 'ToastService', '$mdSidenav', '$state', '$mdMedia', '$mdDialog'];
    module.exports = shellController;
})();
