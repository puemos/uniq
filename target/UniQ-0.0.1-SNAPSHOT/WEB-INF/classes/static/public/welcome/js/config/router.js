define(['require','ngUiRouter'],function (require) {
        'use strict';
    require("ngUiRouter");

    function router($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider
                .state('home', {
                    controller: 'homeController',
                    url: "/home",
                    templateUrl: "welcome/views/home.html",
                    resolve: {
                        isLoggedIn: function (AuthService) {
                            return AuthService.isLoggedIn();
                        }
                    }
                })
                .state('login', {
                    url: "/login",
                    controller: 'loginController',
                    templateUrl: "welcome/views/login.html"
                })
                .state('about', {
                    url: "/about",
                    controller: 'loginController',
                    templateUrl: "welcome/views/about.html"
                });
        }
    router.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];
    return router;
    });

