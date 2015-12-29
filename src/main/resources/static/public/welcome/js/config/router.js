define(['require', 'ngUiRouter'], function (require) {
    'use strict';
    require("ngUiRouter");
    function router($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                controller: 'homeController',
                url: "/home",
                templateUrl: "/public/welcome/views/home.html",
            })
            .state('dashboard', {
                url: "/dashboard",
                controller: 'dashboardController',
                templateUrl: "/public/welcome/views/dashboard.html"
            })
            .state('group', {
                url: "/groupinfo/{groupId}",
                controller: 'groupController',
                templateUrl: "/public/welcome/views/group.html"
            })
            .state('about', {
                url: "/about",
                controller: 'loginController',
                templateUrl: "/public/welcome/views/about.html"
            });
        $locationProvider
            .html5Mode(true);
        $urlRouterProvider.otherwise("/home");
    };

    router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    return router;
});

