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
            .state('login', {
                url: "/login",
                controller: 'loginController',
                templateUrl: "/public/welcome/views/login.html"
            })
            .state('userGroups', {
                url: "/userGroups",
                controller: 'groupsController',
                templateUrl: "/public/welcome/views/userGroups.html"
            })
            .state('group', {
                url: "/groupinfo/{groupId}",
                controller: 'groupsController',
                templateUrl: "/public/welcome/views/group.html"
            })
            .state('signup', {
                url: "/signup",
                controller: 'signupController',
                templateUrl: "/public/welcome/views/signup.html"
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

